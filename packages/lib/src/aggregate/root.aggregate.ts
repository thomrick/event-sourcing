import { IApplicable, IEvent } from '../event';
import { IAggregate } from './aggregate.interface';

export abstract class RootAggregate implements IAggregate {
  private readonly _uncommittedChanges: IEvent[] = [];

  public abstract apply(event: IEvent): IAggregate;

  public rebuild(events: IEvent[]): this {
    return events.reduce((aggregate, event) => event.apply(aggregate), this as IApplicable) as this;
  }

  protected save(event: IEvent): void {
    this._uncommittedChanges.push(event);
  }

  public get uncommittedChanges(): IEvent[] {
    return this._uncommittedChanges;
  }
}
