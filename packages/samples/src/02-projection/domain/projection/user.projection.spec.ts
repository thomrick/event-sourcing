import { IProjection } from '@thomrick/event-sourcing';
import { BasicCredentials, ICredentials, IUser, IUserId, UserCreated, UUIDUserId } from '../../../00-common';
import { UserProjection } from './user.projection';

describe('UserProjection', () => {
  const id: IUserId = UUIDUserId.create();
  const credentials: ICredentials = new BasicCredentials('email', 'password', 'username');

  it('can be created', () => {
    const projection: IProjection = new UserProjection();
  });

  xit('should apply user creted event', () => {
    const projection: IUser & IProjection = new UserProjection();

    projection.state().apply(new UserCreated(id, credentials));

    expect(projection.id).toEqual(id);
    expect(projection.credentials).toEqual(credentials);
    expect(projection.logged).toBeFalsy();
  });

});
