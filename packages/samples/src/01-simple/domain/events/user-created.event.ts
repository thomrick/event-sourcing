import { IEvent } from '@thomrick/event-sourcing';
import { ICredentials } from '../model';

export class UserCreated implements IEvent {
  public readonly credentials: ICredentials;

  constructor(credentials: ICredentials) {
    this.credentials = credentials;
  }

  public get name(): string {
    return UserCreated.name;
  }
}
