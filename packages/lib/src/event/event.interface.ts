import { IApplicable } from './applicable.interface';

export interface IEvent {
  readonly name: string;
  apply(applicable: IApplicable): IApplicable;
}
