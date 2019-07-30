import uuid from 'uuid/v1';
import { IUserId } from '../user-id.interface';

export class UUIDUserId implements IUserId {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(): UUIDUserId {
    return new UUIDUserId(uuid());
  }

  public static from(value: string): UUIDUserId {
    return new UUIDUserId(value);
  }
}
