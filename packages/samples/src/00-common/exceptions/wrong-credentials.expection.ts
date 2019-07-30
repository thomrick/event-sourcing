export class WrongCredentialsException extends Error {
  constructor() {
    super('Wrong credentials');
  }
}
