import { Store } from '@ngrx/store';
import * as moment from 'moment';
import {
  AppState,
  getAllMessages
} from '../app.reducer';
import { uuid } from '../util';
import {
  User,
  Thread,
  Message
} from '../reducers/models';
import * as ThreadActions from '../reducers/threads/thread.actions';
import * as UserActions from '../reducers/users/user.actions';

const me: User = {
  id: uuid(),
  isClient: true,
  name: 'Me!',
  avatarSrc: 'assets/images/avatars/male-avatar-4.png'
};
// Language: mademish - fr: Says nothing!
const madem: User = {
  id: uuid(),
  name: 'Mademish Bot',
  avatarSrc: 'assets/images/avatars/female-avatar-2.png'
};
const tMadem: Thread = {
  id: 'tMadem',
  name: madem.name,
  avatarSrc: madem.avatarSrc,
  messages: []
};
// Language: echoish - sp:
const echo: User = {
  id: uuid(),
  name: 'echoish Bot',
  avatarSrc: 'assets/images/avatars/male-avatar-1.png'
};
const tEcho: Thread = {
  id: 'tEcho',
  name: echo.name,
  avatarSrc: echo.avatarSrc,
  messages: []
};
// Language: revse - zh
const rev: User = {
  id: uuid(),
  name: 'reversish Bot',
  avatarSrc: 'assets/images/avatars/female-avatar-4.png'
};
const tRev: Thread = {
  id: 'tRev',
  name: rev.name,
  avatarSrc: rev.avatarSrc,
  messages: []
};
// Language: waitan - de
const wait: User = {
  id: uuid(),
  name: 'waitan Bot',
  avatarSrc: 'assets/images/avatars/male-avatar-2.png'
};
const tWait: Thread = {
  id: 'tWait',
  name: wait.name,
  avatarSrc: wait.avatarSrc,
  messages: []
};

export const ChatExampleData = (
    store: Store<AppState>
  ) => {

  // store.dispatch(UserActions.setCurrentUser(me));
  store.dispatch(new UserActions.SetCurrentUserAction(me));

  // store.dispatch(ThreadActions.addThread(tMadem));
  store.dispatch(new ThreadActions.AddThreadAction(tMadem));

  store.dispatch(
    new ThreadActions.AddMessageAction(tMadem, {
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.'
  }));
  store.dispatch(
    new ThreadActions.AddMessageAction(tMadem, {
    author: madem,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.'
  }));

  // store.dispatch(ThreadActions.addThread(tEcho));
  store.dispatch(new ThreadActions.AddThreadAction(tEcho));
  store.dispatch(
    new ThreadActions.AddMessageAction(tEcho, {
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: 'I\'ll echo whatever you send me!'
  }));

  // store.dispatch(ThreadActions.addThread(tRev));
  store.dispatch(new ThreadActions.AddThreadAction(tRev));
  store.dispatch(
    new ThreadActions.AddMessageAction(tRev, {
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: '!em dnes uoy revetahw ohce ll\'I'
  }));

  // store.dispatch(ThreadActions.addThread(tWait));
  store.dispatch(new ThreadActions.AddThreadAction(tWait));
  store.dispatch(
    new ThreadActions.AddMessageAction(tWait, {
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding.` +
    ` Try sending '3'.`
  }));

  // select the first thread to display
  store.dispatch(new ThreadActions.SelectThreadAction(tMadem));

  // We set up the bots
  const handledMessages = {};

  store.select(getAllMessages)
    .subscribe((messages: Array<Message>) => {
      const myMsgs = messages.filter(message => message.author.id === me.id);
      myMsgs.map(message => {
        if (handledMessages.hasOwnProperty(message.id)) { return; }
        handledMessages[message.id] = true;

        switch (message.thread.id) {
          // Language: mademish - fr
          case tMadem.id:
            store.dispatch(
              new ThreadActions.AddMessageAction(tMadem, {
              author: madem,
              text: 'Oh la! la!'
            }));
          break;
          // Language: echoish - es
          case tEcho.id:
            // We then dispatch
            store.dispatch(
              new ThreadActions.AddMessageAction(tEcho, {
              author: echo,
              text: message.text
            }));
          break;
          // Language: reversish - zh
          case tRev.id:
            // We then dispatch
            store.dispatch(
              new ThreadActions.AddMessageAction(tRev, {
              author: rev,
              text: message.text.split('').reverse().join('')
            }));
          break;
          // Language: waitan - de
          case tWait.id:
            let waitTime: number = parseInt(message.text, 10);
            let reply: string;

            if (isNaN(waitTime)) {
              waitTime = 0;
              reply = `I didn\'t understand ${message.text}. Type a numeral!`;
            } else {
              reply = `I waited ${waitTime} seconds to say I <3 U!`;
            }
            setTimeout(() => {
              store.dispatch(
                new ThreadActions.AddMessageAction(tWait, {
                author: wait,
                text: reply
              }));
            }, waitTime * 1000);
          break;

          default: break;
        } // switch
      }); // map
    }); // subscribe
};
