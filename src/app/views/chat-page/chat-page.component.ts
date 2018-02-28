import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  template: `<div>
                <app-chat-nav-bar></app-chat-nav-bar>
                <div class="container">
                  <app-chat-threads></app-chat-threads>
                  <app-chat-window></app-chat-window>
                </div>
              </div>`,
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
