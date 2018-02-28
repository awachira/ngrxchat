import {
  Component,
  Inject
} from '@angular/core';

import {
  AppState,
  getUnreadMessagesCount
} from '../../app.reducer';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat-nav-bar',
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header"></div>
      <p class="navbar-text navbar-right">
        <button class="btn btn-primary" type="button">
          Messages <span class="badge">{{unreadMessagesCount$ | async}}</span>
        </button>
      </p>
    </div>
  </nav>
  `,
  styleUrls: ['./chat-nav-bar.component.scss']
})
export class ChatNavBarComponent {
  public unreadMessagesCount$: Observable<number>;

  constructor(public store: Store<AppState>) {
    this.unreadMessagesCount$ = store.select(getUnreadMessagesCount);
  }
}
