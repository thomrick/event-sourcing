import { IApplicable, IEvent } from '@thomrick/event-sourcing';
import { ICredentials } from '../model';

export class UserCreated implements IEvent {
  public readonly credentials: ICredentials;

  constructor(credentials: ICredentials) {
    this.credentials = credentials;
  }

  public apply(applicable: IApplicable): IApplicable {
    return applicable.apply(this);
  }

  public get name(): string {
    return UserCreated.name;
  }
}
