import { Message } from '../messages/message.model';
/**
 * Represents group of Users exchanging msgs.
 */
export interface Thread {
  id: string;
  messages: Array<Message>;
  name: string;
  avatarSrc: string;
}
