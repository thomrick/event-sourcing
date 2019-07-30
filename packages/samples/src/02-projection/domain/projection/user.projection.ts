import { AbstractStateApplier, IEvent, IProjection, IStateApplier } from '@thomrick/event-sourcing';
import { UserCreated, UserLoggedIn } from '../../../00-common';
import { ICredentials, IUserId } from '../../../00-common/model';
import { IUser } from '../../../00-common/user.interace';

export class UserProjection implements IProjection, IUser {
  private _id!: IUserId;
  private _credentials!: ICredentials;
  private _logged!: boolean;

  public get id(): IUserId {
    return this._id;
  }

  public get credentials(): ICredentials {
    return this._credentials;
  }

  public get logged(): boolean {
    return this._logged;
  }

  public stateApplier(): IStateApplier<UserProjection> {
    return new class StateApplier extends AbstractStateApplier<UserProjection> {
      public apply(event: IEvent): UserProjection {
        switch (event.name) {
          case UserCreated.name:
            return this.applyUserCreated(event as UserCreated);
          case UserLoggedIn.name:
            return this.applyUserLoggedIn(event as UserLoggedIn);
          default:
            return this.projection;
        }
      }

      public applyUserCreated(event: UserCreated): UserProjection {
        this.projection._id = event.userId;
        this.projection._credentials = event.credentials;
        return this.projection;
      }

      public applyUserLoggedIn(event: UserLoggedIn): UserProjection {
        this.projection._logged = true;
        return this.projection;
      }

    }(this);
  }
}
