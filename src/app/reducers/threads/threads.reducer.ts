import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { createSelector } from 'reselect';

import { Thread } from './thread.model';
import { Message} from '../messages/message.model';
import * as ThreadActions from './thread.actions';

export interface ThreadsEntities {
  [id: string]: Thread;
}
export interface ThreadsState {
  ids: string[];
  entities: ThreadsEntities;
  currentThreadId?: string;
}
const initialState: ThreadsState = {
  ids: [],
  currentThreadId: null,
  entities: {}
};

export const ThreadsReducer =
  (state: ThreadsState = initialState, action: Action): ThreadsState => {
    switch (action.type) {

      case ThreadActions.ADD_THREAD: {
        const thread = (<ThreadActions.AddMessageAction>action).thread;

        if (state.ids.includes(thread.id)) {
          return state;
        }

        return {
          ids: [ ...state.ids, thread.id ],
          currentThreadId: state.currentThreadId,
          entities: Object.assign({}, state.entities, {
            [thread.id]: thread
          })
        };
      }

      case ThreadActions.ADD_MESSAGE: {
        const thread = (<ThreadActions.AddMessageAction>action).thread;
        const message = (<ThreadActions.AddMessageAction>action).message;

        // special case: if message being added is in current thread,
        // mark as read
        const isRead = message.thread.id === state.currentThreadId ?
                        true : message.isRead;
        const newMessage = Object.assign({}, message, { isRead: isRead });

        // grab old thread from entities
        const oldThread = state.entities[thread.id];

        // create a new thread with our newMessage
        const newThread = Object.assign({}, oldThread, {
          messages: [...oldThread.messages, newMessage]
        });

        return {
          ids: state.ids,
          currentThreadId: state.currentThreadId,
          entities: Object.assign({}, state.entities, {
            [thread.id]: newThread
          })
        };
      }

      // select a particular thread in the UI
      case ThreadActions.SELECT_THREAD: {
        const thread = (<ThreadActions.SelectThreadAction>action).thread;
        const oldThread = state.entities[thread.id];

        // mark all messages as read
        const newMessages = oldThread.messages.map(
          (message: Message) => Object.assign({}, message, { isRead: true }));
        // give them to this new thread
        const newThread = Object.assign({}, oldThread, {
          messages: newMessages
        });

        return {
          ids: state.ids,
          currentThreadId: thread.id,
          entities: Object.assign({}, state.entities, {
            [thread.id]: newThread
          })
        };
      }

      default:
        return state;
    }
  };

export const getThreadsState = (state): ThreadsState => state.threads;

export const getThreadsEntities = createSelector(
  getThreadsState,
  ( state: ThreadsState ) => state.entities );

export const getAllThreads = createSelector(
  getThreadsEntities,
  ( entities: ThreadsEntities ) => Object.keys(entities)
                        .map((threadId) => entities[threadId]));

export const getUnreadMessagesCount = createSelector(
  getAllThreads,
  ( threads: Array<Thread> ) => threads.reduce(
    (unreadCount: number, thread: Thread) => {
      thread.messages.forEach((message: Message) => {
        if (!message.isRead) {
          ++unreadCount;
        }
      });
      return unreadCount;
    },
    0));

export const getCurrentThread = createSelector(
  getThreadsEntities,
  getThreadsState,
  ( entities: ThreadsEntities, state: ThreadsState ) =>
  entities[state.currentThreadId] );

export const getAllMessages = createSelector(
  getAllThreads,
  ( threads: Thread[] ) =>
    threads.reduce(
      (messages, thread) => [...messages, ...thread.messages], []
    ).sort((m1, m2) => m1.setAt - m2.setAt));
