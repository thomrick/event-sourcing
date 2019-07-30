import { IStateApplier } from '../state-applier';

export interface IProjection {
  state(): IStateApplier;
}
