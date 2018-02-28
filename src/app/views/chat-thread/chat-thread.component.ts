import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  Thread
} from '../../reducers/models';

@Component({
  selector: 'app-chat-thread',
  template: `
    <div class="media conversation">
      <div class="pull-left">
        <img class="media-object avatar"
        src="{{thread.avatarSrc}}">
      </div>
      <div class="media-body">
        <h5 class="media-heading contact-name">{{thread.name}}
          <span *ngIf="selected">&bull;</span>
        </h5>
        <small class="message-preview">
          {{thread.messages[thread.messages.length - 1].text}}
        </small>
      </div>
      <a (click)="clicked($event)" class="div-link">Select</a>
    </div>
`,
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  @Input() selected: boolean;
  @Output() threadSelected: EventEmitter<Thread>;

  constructor() { this.threadSelected = new EventEmitter<Thread>(); }

  ngOnInit(): void { }

  clicked(event: any): void {
    this.threadSelected.emit(this.thread);
    event.preventDefault();
  }
}
