import { IEvent } from '../../event';
import { IAggregate } from '../aggregate.interface';

export abstract class AbstractAggregate implements IAggregate {
  private readonly _uncommittedChanges: IEvent[] = [];

  public abstract apply(event: IEvent): IAggregate;

  public rebuild(events: IEvent[]): this {
    return events.reduce((aggregate: IAggregate, event: IEvent) => event.apply(aggregate), this) as this;
  }

  protected applyAndSave(event: IEvent): IAggregate {
    this.apply(event);
    this.save(event);
    return this;
  }

  private save(event: IEvent): void {
    this._uncommittedChanges.push(event);
  }

  public get uncommittedChanges(): IEvent[] {
    return this._uncommittedChanges;
  }
}
