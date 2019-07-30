import { AbstractEvent } from '@thomrick/event-sourcing';
import { ICredentials, IUserId } from '../model';

export class UserCreated extends AbstractEvent {
  public readonly userId: IUserId;
  public readonly credentials: ICredentials;

  constructor(userId: IUserId, credentials: ICredentials) {
    super();
    this.userId = userId;
    this.credentials = credentials;
  }

  public get name(): string {
    return UserCreated.name;
  }
}
