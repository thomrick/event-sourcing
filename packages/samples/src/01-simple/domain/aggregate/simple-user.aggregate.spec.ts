import { IEvent } from '@thomrick/event-sourcing';
import { BasicCredentials, IUserId, UserCreated, UserLoggedIn, UserLoggedOut, UUIDUserId } from '../../../00-common';
import { SimpleUserAggregate } from './simple-user.aggregate';

describe('SimpleUserAggregate', () => {
  const id: IUserId = UUIDUserId.create();
  const credentials = new BasicCredentials('email', 'password', 'username');

  it('should create and log in a new user', () => {
    const aggregate = new SimpleUserAggregate(id, credentials);

    expect(aggregate.id).toEqual(id);
    expect(aggregate.credentials).toEqual(credentials);
    expect(aggregate.logged).toBeTruthy();

    const changes: IEvent[] = aggregate.uncommittedChanges;
    expect(changes).toContainEqual(new UserCreated(id, credentials));
    expect(changes).toContainEqual(new UserLoggedIn(id));
  });

  it('should log out the user', () => {
    const aggregate = new SimpleUserAggregate(id, credentials);

    aggregate.logOut();

    expect(aggregate.logged).toBeFalsy();
    expect(aggregate.uncommittedChanges).toContainEqual(new UserLoggedOut(id));
  });

  it('should log in the user', () => {
    const aggregate = new SimpleUserAggregate(id, credentials);
    aggregate.logOut();

    aggregate.logIn(credentials);

    expect(aggregate.logged).toBeTruthy();
    expect(aggregate.uncommittedChanges).toContainEqual(new UserLoggedIn(id));
  });

  it('should rebuild the aggregate from events', () => {
    const events: IEvent[] = [
      new UserCreated(id, credentials),
      new UserLoggedIn(id),
      new UserLoggedOut(id),
    ];

    const aggregate = new SimpleUserAggregate().rebuild(events);

    expect(aggregate.id).toEqual(id);
    expect(aggregate.credentials).toEqual(credentials);
    expect(aggregate.logged).toBeFalsy();
  });
});
