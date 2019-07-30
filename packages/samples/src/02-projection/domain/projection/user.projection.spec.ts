import { IProjection } from '@thomrick/event-sourcing';
import {
  BasicCredentials,
  ICredentials,
  IUser,
  IUserId,
  UserCreated,
  UserLoggedIn,
  UserLoggedOut,
  UUIDUserId,
} from '../../../00-common';
import { UserProjection } from './user.projection';

describe('UserProjection', () => {
  const id: IUserId = UUIDUserId.create();
  const credentials: ICredentials = new BasicCredentials('email', 'password', 'username');

  it('should apply user creted event', () => {
    const projection: IUser & IProjection = new UserProjection();

    projection.stateApplier().apply(new UserCreated(id, credentials));

    expect(projection.id).toEqual(id);
    expect(projection.credentials).toEqual(credentials);
    expect(projection.logged).toBeFalsy();
  });

  it('should apply user logged in event', () => {
    const projection: IUser & IProjection = new UserProjection();

    projection.stateApplier().apply(new UserLoggedIn(id));

    expect(projection.logged).toBeTruthy();
  });

  it('should apply user logged out event', () => {
    const projection: IUser & IProjection = new UserProjection();
    projection.stateApplier().apply(new UserLoggedIn(id));

    projection.stateApplier().apply(new UserLoggedOut(id));

    expect(projection.logged).toBeFalsy();
  });

});
