import { IEvent } from '../event';
import { IProjection } from '../projection';

export interface IStateApplier<T extends IProjection> {
  apply(event: IEvent): T;
}
