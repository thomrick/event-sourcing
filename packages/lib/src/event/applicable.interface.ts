import { IEvent } from './event.interface';

export interface IApplicable {
  apply(event: IEvent): IApplicable;
}
