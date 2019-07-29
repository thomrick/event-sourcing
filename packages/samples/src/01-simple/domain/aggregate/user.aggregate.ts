import { IEvent, RootAggregate } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';
import { IUser } from '../user.interace';

export class UserAggregate extends RootAggregate implements IUser {
  private _email!: string;
  private _password!: string;
  private _username!: string;

  private constructor(email: string, password: string, username: string) {
    super();
    const event = new UserCreated(email, password, username);
    this.apply(event);
    this.save(event);
  }

  public static with(email: string, password: string, username: string): UserAggregate {
    return new UserAggregate(email, password, username);
  }

  public apply(event: IEvent): UserAggregate {
    switch (event.name) {
      case UserCreated.name:
        return this.applyUserCreated(event as UserCreated);
      default:
        return this;
    }
  }

  private applyUserCreated(event: UserCreated): UserAggregate {
    this._email = event.email;
    this._password = event.password;
    this._username = event.username;
    return this;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get username(): string {
    return this._username;
  }

  public get logged(): boolean {
    return true;
  }
}
