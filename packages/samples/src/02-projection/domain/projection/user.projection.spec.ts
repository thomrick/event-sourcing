import { IProjection } from '@thomrick/event-sourcing';
import { UserProjection } from './user.projection';

describe('UserProjection', () => {
  it('can be created', () => {
    const projection: IProjection = new UserProjection();
  });
});
