import { IEvent } from '../../event';
import { IProjection } from '../../projection';
import { IStateApplier } from '../state-applier.interface';

export abstract class AbstractStateApplier<T extends IProjection> implements IStateApplier<T> {
  protected projection: T;

  constructor(projection: T) {
    this.projection = projection;
  }

  public abstract apply(event: IEvent): T;
}
