import { RootEvent } from '@thomrick/event-sourcing';
import { IUserId } from '../model';

export class UserLoggedIn extends RootEvent {
  public readonly userId: IUserId;

  constructor(userId: IUserId) {
    super();
    this.userId = userId;
  }

  public get name(): string {
    return UserLoggedIn.name;
  }
}
