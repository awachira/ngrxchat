import {
  Action
} from '@ngrx/store';
import { uuid } from '../../util';
import { Message } from '../messages/message.model';
import { User } from '../users/user.model';
import { Thread } from '../threads/thread.model';

export const ADD_THREAD = '[Thread] Add';
export class AddThreadAction implements Action {
  type = ADD_THREAD;
  constructor(public thread: Thread) {}
}

export const ADD_MESSAGE = '[Thread] Add Message';
export class AddMessageAction implements Action {
  type = ADD_MESSAGE;
  thread: Thread;
  message: Message;
  constructor(private _thread: Thread, private _message: Message) {
    const defaults = {
      id: uuid(),
      sentAt: new Date(),
      isRead: false,
      thread: _thread
    };
    this.message = Object.assign({}, defaults, _message);
    this.thread  = _thread;
  }
}

export const SELECT_THREAD = '[Thread] Select';
export class SelectThreadAction implements Action {
  type = SELECT_THREAD;
  constructor(public thread: Thread) {}
}
