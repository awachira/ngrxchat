import { User } from '../users/user.model';
import { Thread } from '../threads/thread.model';

export interface Message {
  id?: string;
  sentAt?: Date;
  isRead?: boolean;
  thread?: Thread;
  author: User;
  text: string;
}
