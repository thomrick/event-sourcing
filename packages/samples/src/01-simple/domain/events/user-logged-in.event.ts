import { IApplicable, IEvent } from '@thomrick/event-sourcing';

export class UserLoggedIn implements IEvent {

  public apply(applicable: IApplicable): IApplicable {
    return applicable.apply(this);
  }

  public get name(): string {
    return UserLoggedIn.name;
  }
}
