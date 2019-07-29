import { ICredentials } from '../credentials.interface';
import { BasicCredentials } from './basic.credentials';

describe('BasicCredentials', () => {
  const email: string = 'email';
  const password: string = 'password';

  it('should return true', () => {
    const credentialsA: ICredentials = new BasicCredentials(email, password);
    const credentialsB: ICredentials = new BasicCredentials(email, password);

    expect(credentialsA.compare(credentialsB)).toBeTruthy();
  });

  it('should return false', () => {
    const credentialsA: ICredentials = new BasicCredentials(email, password);
    const credentialsB: ICredentials = new BasicCredentials(email, 'wrongPassword');

    expect(credentialsA.compare(credentialsB)).toBeFalsy();
  });
});
