import { ICredentials } from '../credentials.interface';

export class BasicCredentials implements ICredentials {
  public readonly email: string;
  public readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public compare(credentials: BasicCredentials): boolean {
    return this.email === credentials.email && this.password === credentials.password;
  }
}
