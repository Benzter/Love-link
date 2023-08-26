import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild("memberTabs") memberTabs?: TabsetComponent;
  member: Member | undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab?:TabDirective;
  messages: Message[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute,
    private messageServices: MessageService) { }

  ngOnInit(): void {
    this.loadMember()
    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

onTabActivate(data: TabDirective){
  this.activeTab = data;
  if (this.activeTab.heading = "Messages"){
    this.loadMessages();
  }
}

selectTab(heading: String) {
  if (this.memberService) {
    this.memberTabs!.tabs.find(x => x.heading === heading)!.active = true;
  }
}

loadMessages() {
  if(this.member) {
    this.messageServices.getMessageThread(this.member.userName).subscribe({
      next: message => this.messages = message
    })
  }
}

  getImages(){
    if(!this.member) return [];
    const imageUrl = [];
    for(const photo of this.member.photos){
      imageUrl.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imageUrl;
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get("username");
    if(!username) return
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.galleryImages = this.getImages();
      }
    })
  }
}
