import { ICredentials, IUserId } from './model';

export interface IUser {
  readonly id: IUserId;
  readonly credentials: ICredentials;
  readonly logged: boolean;
}
