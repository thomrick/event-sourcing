import { ICredentials, IUserId } from './model';

export interface IUser {
  readonly id: IUserId;
  readonly credentials: ICredentials;
  readonly logged: boolean;
}

export interface IUserFeature {
  logIn(credentials: ICredentials): void;
  logOut(): void;
}
