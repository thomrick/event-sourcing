import { IEvent } from '../event';

export interface IAggregate {
  readonly uncommittedChanges: IEvent[];
  apply(event: IEvent): IAggregate;
  rebuild(events: IEvent[]): IAggregate;
}
