import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import {
  Thread
} from '../../reducers/models';
import * as ThreadActions from '../../reducers/threads/thread.actions';
import {
  AppState,
  getCurrentThread,
  getAllThreads
} from '../../app.reducer';

@Component({
  selector: 'app-chat-threads',
  template: `<div class="row">
                <div class="conversation-wrap">
                  <app-chat-thread
                    *ngFor="let thread of (threads$ | async)"
                    [thread]="thread"
                    [selected]="thread.id === currentThreadId"
                    (threadSelected)="handleThreadClicked($event)">
                  </app-chat-thread>
                </div>
              </div>`,
  styleUrls: ['./chat-threads.component.scss']
})
export class ChatThreadsComponent {
  threads$: Observable<Array<Thread>>;
  private currThread$: Observable<Thread>;
  currentThreadId: string;

  constructor(private store: Store<AppState>) {
    // Store the threads list
    this.threads$ = store.select(getAllThreads);

    // mark the current thread as selected,
    // so we store the currentThreadId as a value
    this.currThread$ = store.select(getCurrentThread);
    const threadObserver = {
      next: (thread: Thread) => { this.currentThreadId = thread.id; }
    };
    this.currThread$.subscribe(threadObserver);
  }

  protected handleThreadClicked(thread: Thread): void {
    this.store.dispatch(new ThreadActions.SelectThreadAction(thread));
  }
}
