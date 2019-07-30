import { IEvent } from '@thomrick/event-sourcing';

export class UserLoggedIn implements IEvent {
  public get name(): string {
    return UserLoggedIn.name;
  }
}
