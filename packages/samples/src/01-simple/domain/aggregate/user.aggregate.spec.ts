import { UserCreated } from '../events';
import { UserAggregate } from './user.aggregate';

describe('UserAggregate', () => {
  const email: string = 'email';
  const password: string = 'password';
  const username: string = 'username';

  it('should create a user', () => {
    const aggregate = UserAggregate.with(email, password, username);

    expect(aggregate.email).toEqual(email);
    expect(aggregate.password).toEqual(password);
    expect(aggregate.username).toEqual(username);
    expect(aggregate.logged).toBeTruthy();
  });

  it('should add a user created', () => {
    const aggregate = UserAggregate.with(email, password, username);

    expect(aggregate.uncommittedChanges).toContainEqual(new UserCreated(email, password, username));
  });
});
