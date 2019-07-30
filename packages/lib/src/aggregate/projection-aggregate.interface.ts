import { IEvent } from '../event';
import { IProjection } from '../projection';

export interface IProjectionAggregate<T extends IProjection> {
  readonly projection: T;
  readonly uncommittedChanges: IEvent[];
  rebuild(events: IEvent[]): IProjectionAggregate<T>;
}
