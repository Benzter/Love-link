import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username?:string;
  messages: Message[] = [];

  constructor(private messageServices: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    if(this.username) {
      this.messageServices.getMessageThread(this.username).subscribe({
        next: message => this.messages = message
      })
    }
  }

}
