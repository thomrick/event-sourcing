import { AbstractProjectionAggregate } from '@thomrick/event-sourcing';
import { ICredentials, IUserFeature, IUserId, UserCreated, UserLoggedIn, UserLoggedOut } from '../../../00-common';
import { UserProjection } from '../projection';

export class ProjectionUserAggregate extends AbstractProjectionAggregate<UserProjection> implements IUserFeature {
  constructor(id?: IUserId, credentials?: ICredentials) {
    super(new UserProjection());
    if (!!id && !!credentials) {
      this.createUserWith(id, credentials);
      this.logInUser();
    }
  }

  private createUserWith(id: IUserId, credentials: ICredentials): void {
    const event = new UserCreated(id, credentials);
    this.applyAndSave(event);
  }

  private logInUser(): void {
    const event = new UserLoggedIn(this._projection.id);
    this.applyAndSave(event);
  }

  public logIn(credentials: ICredentials): void {
    const event = new UserLoggedIn(this._projection.id);
    this.applyAndSave(event);
  }

  public logOut(): void {
    const event = new UserLoggedOut(this._projection.id);
    this.applyAndSave(event);
  }
}
