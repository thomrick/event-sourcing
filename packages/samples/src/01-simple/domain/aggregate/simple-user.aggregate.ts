import { AbstractAggregate, IEvent } from '@thomrick/event-sourcing';
import {
  ICredentials,
  IUser,
  IUserFeature,
  IUserId,
  UserCreated,
  UserLoggedIn,
  UserLoggedOut,
  WrongCredentialsException,
} from '../../../00-common';

export class SimpleUserAggregate extends AbstractAggregate implements IUser, IUserFeature {
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
    this.applyAndSave(event);
  }

  private logInUser(): void {
    const event = new UserLoggedIn(this._id);
    this.applyAndSave(event);
  }

  public logIn(credentials: ICredentials): void {
    if (!this._credentials.compare(credentials)) {
      throw new WrongCredentialsException();
    }
    const event = new UserLoggedIn(this._id);
    this.applyAndSave(event);
  }

  public logOut(): void {
    const event = new UserLoggedOut(this._id);
    this.applyAndSave(event);
  }

  public apply(event: IEvent): SimpleUserAggregate {
    switch (event.name) {
      case UserCreated.name:
        return this.applyUserCreated(event as UserCreated);
      case UserLoggedIn.name:
        return this.applyUserLoggedIn(event as UserLoggedIn);
      case UserLoggedOut.name:
        return this.applyUserLoggedOut(event as UserLoggedOut);
      default:
        return this;
    }
  }

  private applyUserCreated(event: UserCreated): SimpleUserAggregate {
    this._id = event.userId;
    this._credentials = event.credentials;
    this._logged = false;
    return this;
  }

  private applyUserLoggedIn(event: UserLoggedIn): SimpleUserAggregate {
    this._logged = true;
    return this;
  }

  private applyUserLoggedOut(event: UserLoggedOut): SimpleUserAggregate {
    this._logged = false;
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
