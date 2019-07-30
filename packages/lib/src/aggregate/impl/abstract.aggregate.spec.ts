import { IEvent } from '../../event';
import { TestAggregate, TestCreated, TestFailed, TestStarted, TestState, TestSucceed } from './utils.spec';

describe('AbstractAggregate', () => {
  const id: string = 'test';
  it('should create a new test', () => {
    const aggregate = new TestAggregate(id);

    expect(aggregate.id).toEqual(id);
    expect(aggregate.state).toEqual(TestState.READY);
  });

  it('should add a test created event', () => {
    const aggregate = new TestAggregate(id);

    expect(aggregate.uncommittedChanges).toContainEqual(new TestCreated(id));
  });

  it('should run the test', () => {
    const aggregate = new TestAggregate(id);

    aggregate.run();

    expect(aggregate.state).toEqual(TestState.RUNNING);
  });

  it('should add a test started event', () => {
    const aggregate = new TestAggregate(id);

    aggregate.run();

    expect(aggregate.uncommittedChanges).toContainEqual(new TestStarted(id));
  });

  it('should success the test', () => {
    const aggregate = new TestAggregate(id);
    aggregate.run();

    aggregate.success();

    expect(aggregate.state).toEqual(TestState.SUCCESS);
  });

  it('should add a test succeed event', () => {
    const aggregate = new TestAggregate(id);
    aggregate.run();

    aggregate.success();

    expect(aggregate.uncommittedChanges).toContainEqual(new TestSucceed(id));
  });

  it('should fail the test', () => {
    const aggregate = new TestAggregate(id);
    aggregate.run();

    aggregate.fail();

    expect(aggregate.state).toEqual(TestState.FAIL);
  });

  it('should add a test failed event', () => {
    const aggregate = new TestAggregate(id);
    aggregate.run();

    aggregate.fail();

    expect(aggregate.uncommittedChanges).toContainEqual(new TestFailed(id));
  });

  it('should rebuild the aggregate from events', () => {
    const events: IEvent[] = [
      new TestCreated(id),
      new TestStarted(id),
      new TestSucceed(id),
    ];

    const aggregate = new TestAggregate().rebuild(events);

    expect(aggregate.id).toEqual(id);
    expect(aggregate.state).toEqual(TestState.SUCCESS);
  });
});
