import { IEvent } from '@thomrick/event-sourcing';
import { UserCreated, UserLoggedIn } from '../events';
import { BasicCredentials, IUserId, UUIDUserId } from '../model';
import { UserAggregate } from './user.aggregate';

describe('UserAggregate', () => {
  const id: IUserId = UUIDUserId.create();
  const credentials = new BasicCredentials('email', 'password', 'username');

  it('should create a user', () => {
    const aggregate = new UserAggregate(id, credentials);

    expect(aggregate.id).toEqual(id);
    expect(aggregate.credentials).toEqual(credentials);
    expect(aggregate.logged).toBeTruthy();
  });

  it('should add a user created', () => {
    const aggregate = new UserAggregate(id, credentials);

    expect(aggregate.uncommittedChanges).toContainEqual(new UserCreated(id, credentials));
  });

  it('should add a user logged in event', () => {
    const aggregate = new UserAggregate(id, credentials);

    expect(aggregate.uncommittedChanges).toContainEqual(new UserLoggedIn(id));
  });

  it('should rebuild the aggregate from events', () => {
    const events: IEvent[] = [
      new UserCreated(id, credentials),
      new UserLoggedIn(id),
    ];

    const aggregate = new UserAggregate().rebuild(events);

    expect(aggregate.id).toEqual(id);
    expect(aggregate.credentials).toEqual(credentials);
    expect(aggregate.logged).toBeTruthy();
  });
});
