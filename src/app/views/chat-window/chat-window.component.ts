import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

import {
  AppState,
  getCurrentThread,
  getCurrentUser
} from '../../app.reducer';
import {
  User,
  Thread
} from '../../reducers/models';
import * as ThreadActions from '../../reducers/threads/thread.actions';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {

  currentThread: Thread;
  currentUser: User;
  draftMsg: { text: string };

  constructor(
    private store: Store<AppState>,
    private el: ElementRef
  ) {
    this.draftMsg = { text: '' };

    // this.currThread$ = store.select(getCurrentThread);
    // this.currUser$   = store.select(getCurrentUser);
    store.select(getCurrentThread)
      .combineLatest(
        store.select(getCurrentUser),
        (thread: Thread, user: User) => {
          this.currentThread = thread;
          this.currentUser   = user;
      })
      .subscribe(() => this.scrollToBottom());

    // store.select(getCurrentThread)
    //   .subscribe((thread: Thread) => {
    //     this.currentThread = thread;
    //     this.scrollToBottom();
    //   });
    // store.select(getCurrentUser)
    //   .subscribe((user: User) => {
    //     this.currentUser = user;
    //     this.scrollToBottom();
    //   });

    // this.currThread$
    //   .subscribe((thread: Thread) => this.currentThread = thread );
    // this.currUser$
    //   .subscribe((user: User) => this.currentUser = user );

   }

  private scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
      // tell JS run when finished with current execution queue
      setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight );
    }
  }

  // keyboard binding to 'Enter' key-press
  protected onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }
  private sendMessage(): void {
    this.store.dispatch(
      new ThreadActions.AddMessageAction(
        this.currentThread,
        {
          author: this.currentUser,
          isRead: true,
          text: this.draftMsg.text
        }
    ));
    this.draftMsg = { text: '' };
  }
}
