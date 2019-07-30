import { IStateApplier } from '../state-applier';

export interface IProjection {
  stateApplier(): IStateApplier<IProjection>;
}
