import { ICredentials } from './model';

export interface IUser {
  readonly credentials: ICredentials;
  readonly logged: boolean;
}
