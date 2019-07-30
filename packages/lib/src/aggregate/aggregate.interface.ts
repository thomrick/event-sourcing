import { IApplicable, IEvent } from '../event';

export interface IAggregate extends IApplicable {
  readonly uncommittedChanges: IEvent[];
}
