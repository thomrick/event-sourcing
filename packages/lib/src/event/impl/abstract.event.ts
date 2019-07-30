import { IAggregate } from '../../aggregate';
import { IProjection } from '../../projection';
import { IStateApplier } from '../../state-applier';
import { IEvent } from '../event.interface';

export abstract class AbstractEvent implements IEvent {
  public abstract name: string;

  public apply(aggregate: IAggregate): IAggregate;
  public apply(state: IStateApplier<IProjection>): IProjection;
  public apply(applicable: IAggregate | IStateApplier<IProjection>): IAggregate | IProjection {
    return applicable.apply(this);
  }
}
