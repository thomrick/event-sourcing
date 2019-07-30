import { IAggregate } from '../aggregate';
import { IProjection } from '../projection';
import { IStateApplier } from '../state-applier';

export interface IEvent {
  readonly name: string;
  apply(aggregate: IAggregate): IAggregate;
  apply(state: IStateApplier): IProjection;
}
