import {
  Action
} from '@ngrx/store';
import { User } from './user.model';

export const SET_CURRENT_USER = '[User] Set Current';
export class SetCurrentUserAction implements Action {
  type = SET_CURRENT_USER;
  constructor(public user: User) {}
}
