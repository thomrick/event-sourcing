import { IEvent, RootAggregate } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';
import { ICredentials } from '../model';
import { IUser } from '../user.interace';

export class UserAggregate extends RootAggregate implements IUser {
  private _credentials!: ICredentials;

  public constructor(credentials?: ICredentials) {
    super();
    if (!!credentials) {
      const event = new UserCreated(credentials);
      this.apply(event);
      this.save(event);
    }
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
    this._credentials = event.credentials;
    return this;
  }

  public get credentials(): ICredentials {
    return this._credentials;
  }

  public get logged(): boolean {
    return false;
  }
}
