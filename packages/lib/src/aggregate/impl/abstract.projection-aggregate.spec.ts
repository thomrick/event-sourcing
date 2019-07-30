import { IEvent } from '../../event';
import { TestCreated, TestFailed, TestProjectionAggregate, TestStarted, TestState, TestSucceed } from './utils.spec';

describe('AbstractProjectionAggregate', () => {
  it('should pass', () => expect(true).toBeTruthy());
  const id: string = 'test';
  it('should create a new test', () => {
    // GIVEN
    // WHEN
    const aggregate = new TestProjectionAggregate(id);
    // THEN
    expect(aggregate.projection.id).toEqual(id);
    expect(aggregate.projection.state).toEqual(TestState.READY);
  });

  it('should add a test created event', () => {
    // GIVEN
    // WHEN
    const aggregate = new TestProjectionAggregate(id);
    // THEN
    expect(aggregate.uncommittedChanges).toContainEqual(new TestCreated(id));
  });

  it('should run the test', () => {
    // GIVEN
    const aggregate = new TestProjectionAggregate(id);
    // WHEN
    aggregate.run();
    // THEN
    expect(aggregate.projection.state).toEqual(TestState.RUNNING);
  });

  it('should add a test started event', () => {
    // GIVEN
    const aggregate = new TestProjectionAggregate(id);
    // WHEN
    aggregate.run();
    // THEN
    expect(aggregate.uncommittedChanges).toContainEqual(new TestStarted(id));
  });

  it('should success the test', () => {
    // GIVEN
    const aggregate = new TestProjectionAggregate(id);
    aggregate.run();
    // WHEN
    aggregate.success();
    // THEN
    expect(aggregate.projection.state).toEqual(TestState.SUCCESS);
  });

  it('should add a test succeed event', () => {
    // GIVEN
    const aggregate = new TestProjectionAggregate(id);
    aggregate.run();
    // WHEN
    aggregate.success();
    // THEN
    expect(aggregate.uncommittedChanges).toContainEqual(new TestSucceed(id));
  });

  it('should fail the test', () => {
    // GIVEN
    const aggregate = new TestProjectionAggregate(id);
    aggregate.run();
    // WHEN
    aggregate.fail();
    // THEN
    expect(aggregate.projection.state).toEqual(TestState.FAIL);
  });

  it('should add a test failed event', () => {
    // GIVEN
    const aggregate = new TestProjectionAggregate(id);
    aggregate.run();
    // WHEN
    aggregate.fail();
    // THEN
    expect(aggregate.uncommittedChanges).toContainEqual(new TestFailed(id));
  });

  it('should rebuild the aggregate from events', () => {
    // GIVEN
    const events: IEvent[] = [
      new TestCreated(id),
      new TestStarted(id),
      new TestSucceed(id),
    ];
    // WHEN
    const aggregate = new TestProjectionAggregate().rebuild(events);
    // THEN
    expect(aggregate.projection.id).toEqual(id);
    expect(aggregate.projection.state).toEqual(TestState.SUCCESS);
  });
});
