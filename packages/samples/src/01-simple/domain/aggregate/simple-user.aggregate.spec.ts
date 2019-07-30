import { IEvent } from '@thomrick/event-sourcing';
import { UserCreated, UserLoggedIn } from '../../../00-common/events';
import { BasicCredentials, IUserId, UUIDUserId } from '../../../00-common/model';
import { SimpleUserAggregate } from './simple-user.aggregate';

describe('SimpleUserAggregate', () => {
  const id: IUserId = UUIDUserId.create();
  const credentials = new BasicCredentials('email', 'password', 'username');

  it('should create a user', () => {
    const aggregate = new SimpleUserAggregate(id, credentials);

    expect(aggregate.id).toEqual(id);
    expect(aggregate.credentials).toEqual(credentials);
    expect(aggregate.logged).toBeTruthy();
  });

  it('should add a user created', () => {
    const aggregate = new SimpleUserAggregate(id, credentials);

    expect(aggregate.uncommittedChanges).toContainEqual(new UserCreated(id, credentials));
  });

  it('should add a user logged in event', () => {
    const aggregate = new SimpleUserAggregate(id, credentials);

    expect(aggregate.uncommittedChanges).toContainEqual(new UserLoggedIn(id));
  });

  it('should rebuild the aggregate from events', () => {
    const events: IEvent[] = [
      new UserCreated(id, credentials),
      new UserLoggedIn(id),
    ];

    const aggregate = new SimpleUserAggregate().rebuild(events);

    expect(aggregate.id).toEqual(id);
    expect(aggregate.credentials).toEqual(credentials);
    expect(aggregate.logged).toBeTruthy();
  });
});
