import { AbstractEvent } from '@thomrick/event-sourcing';
import { IUserId } from '../model';

export class UserLoggedOut extends AbstractEvent {
  public readonly userId: IUserId;

  constructor(userId: IUserId) {
    super();
    this.userId = userId;
  }

  public get name(): string {
    return UserLoggedOut.name;
  }
}
