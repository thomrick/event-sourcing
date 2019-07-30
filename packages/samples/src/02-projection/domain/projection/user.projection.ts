import { IEvent, IProjection, IStateApplier } from '@thomrick/event-sourcing';
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

  public state(): IStateApplier {
    // return new class StateApplier implements IStateApplier {
    //   private _projection: UserProjection;

    //   constructor(projection: UserProjection) {
    //     this._projection = projection;
    //   }

    //   public apply(event: IEvent): UserProjection {
    //     return this._projection;
    //   }
    // }(this);
    throw new Error('Method not implemented');
  }
}
