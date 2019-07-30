import { ICredentials } from '../credentials.interface';
import { BasicCredentials } from './basic.credentials';

describe('BasicCredentials', () => {
  const email: string = 'email';
  const password: string = 'password';
  const username: string = 'username';

  it('should return true', () => {
    const credentialsA: ICredentials = new BasicCredentials(email, password, username);
    const credentialsB: ICredentials = new BasicCredentials(email, password, username);

    expect(credentialsA.compare(credentialsB)).toBeTruthy();
  });

  it('should return false caused by wrong password', () => {
    const credentialsA: ICredentials = new BasicCredentials(email, password, username);
    const credentialsB: ICredentials = new BasicCredentials(email, 'wrongPassword', username);

    expect(credentialsA.compare(credentialsB)).toBeFalsy();
  });
});
