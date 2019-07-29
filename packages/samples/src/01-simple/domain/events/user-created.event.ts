import { IEvent } from '@thomrick/event-sourcing';

export class UserCreated implements IEvent {
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }

  public get name(): string {
    return UserCreated.name;
  }
}
