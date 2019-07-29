import { IProfile } from '../profile.interface';

export class ProfileImpl implements IProfile {
  public readonly username: string;

  constructor(username: string) {
    this.username = username;
  }
}
