import { ICredentials } from '../credentials.interface';

export class BasicCredentials implements ICredentials {
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }

  public compare(credentials: BasicCredentials): boolean {
    return this.email === credentials.email && this.password === credentials.password;
  }
}
