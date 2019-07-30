import { IEvent } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';
import { BasicCredentials } from '../model';
import { UserAggregate } from './user.aggregate';

describe('UserAggregate', () => {
  const credentials = new BasicCredentials('email', 'password', 'username');

  it('should create a user', () => {
    const aggregate = new UserAggregate(credentials);

    expect(aggregate.credentials).toEqual(credentials);
    expect(aggregate.logged).toBeFalsy();
  });

  it('should add a user created', () => {
    const aggregate = new UserAggregate(credentials);

    expect(aggregate.uncommittedChanges).toContainEqual(new UserCreated(credentials));
  });

  it('should rebuild the aggregate from events', () => {
    const events: IEvent[] = [
      new UserCreated(credentials),
    ];

    const aggregate = new UserAggregate().rebuild(events);

    expect(aggregate.credentials).toEqual(credentials);
  });
});
