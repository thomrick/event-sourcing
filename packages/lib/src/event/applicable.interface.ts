import { IEvent } from '../../dist';

export interface IApplicable {
  apply(event: IEvent): IApplicable;
}
