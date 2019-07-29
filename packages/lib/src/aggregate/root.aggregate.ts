import { IEvent } from '../event';
import { IAggregate } from './aggregate.interface';

export abstract class RootAggregate implements IAggregate {
  private readonly _uncommittedChanges: IEvent[] = [];

  public abstract apply(event: IEvent): IAggregate;

  protected save(event: IEvent): void {
    this._uncommittedChanges.push(event);
  }

  public get uncommittedChanges(): IEvent[] {
    return this._uncommittedChanges;
  }
}
