import {
  UsersState,
  UsersReducer
} from './reducers/users/users.reducer';
export * from './reducers/users/users.reducer';
import {
  ThreadsState,
  ThreadsReducer
} from './reducers/threads/threads.reducer';
export * from './reducers/threads/threads.reducer';

export interface AppState {
  users: UsersState;
  threads: ThreadsState;
}
export const rootReducer = {
  users: UsersReducer,
  threads: ThreadsReducer
};
