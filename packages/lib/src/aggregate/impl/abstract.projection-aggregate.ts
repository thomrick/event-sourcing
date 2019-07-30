import { IEvent } from '../../event';
import { IProjection } from '../../projection';
import { IProjectionAggregate } from '../projection-aggregate.interface';

export abstract class AbstractProjectionAggregate<T extends IProjection> implements IProjectionAggregate<T> {
  protected _projection: T;
  protected _uncommittedChanges: IEvent[] = [];

  constructor(projection: T) {
    this._projection = projection;
  }

  public rebuild(events: IEvent[]): this {
    events.reduce((projection, event) => event.apply(projection.stateApplier()), this._projection as IProjection);
    return this;
  }

  protected applyAndSave(event: IEvent): void {
    this.apply(event);
    this.save(event);
  }

  private apply(event: IEvent): void {
    this._projection.stateApplier().apply(event);
  }

  private save(event: IEvent): void {
    this._uncommittedChanges.push(event);
  }

  public get projection(): T {
    return this._projection;
  }

  public get uncommittedChanges(): IEvent[] {
    return this._uncommittedChanges;
  }
}
