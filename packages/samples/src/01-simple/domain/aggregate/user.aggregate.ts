import { IEvent, RootAggregate } from '@thomrick/event-sourcing';
import { UserCreated, UserLoggedIn } from '../events';
import { ICredentials, IUserId } from '../model';
import { IUser } from '../user.interace';

export class UserAggregate extends RootAggregate implements IUser {
  private _id!: IUserId;
  private _credentials!: ICredentials;
  private _logged!: boolean;

  public constructor(id?: IUserId, credentials?: ICredentials) {
    super();
    if (this.isConstructorParamsValid(id, credentials)) {
      this.createUserWith(id!, credentials!);
      this.logInUser();
    }
  }

  private isConstructorParamsValid(...params: any[]): boolean {
    return params.every((param) => !!param);
  }

  private createUserWith(id: IUserId, credentials: ICredentials): void {
    const event = new UserCreated(id, credentials);
    this.apply(event);
    this.save(event);
  }

  private logInUser(): void {
    const event = new UserLoggedIn(this._id);
    this.apply(event);
    this.save(event);
  }

  public apply(event: IEvent): UserAggregate {
    switch (event.name) {
      case UserCreated.name:
        return this.applyUserCreated(event as UserCreated);
      case UserLoggedIn.name:
        return this.applyUserLoggedIn(event as UserLoggedIn);
      default:
        return this;
    }
  }

  private applyUserCreated(event: UserCreated): UserAggregate {
    this._id = event.userId;
    this._credentials = event.credentials;
    this._logged = false;
    return this;
  }

  private applyUserLoggedIn(event: UserLoggedIn): UserAggregate {
    this._logged = true;
    return this;
  }

  public get id(): IUserId {
    return this._id;
  }

  public get credentials(): ICredentials {
    return this._credentials;
  }

  public get logged(): boolean {
    return this._logged;
  }
}
