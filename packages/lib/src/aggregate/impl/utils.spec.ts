import { AbstractEvent, IEvent } from '../../event';
import { IProjection } from '../../projection';
import { AbstractStateApplier, IStateApplier } from '../../state-applier';
import { AbstractAggregate } from './abstract.aggregate';
import { AbstractProjectionAggregate } from './abstract.projection-aggregate';

export class TestCreated extends AbstractEvent {
  public readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  public get name(): string {
    return TestCreated.name;
  }
}

export class TestStarted extends AbstractEvent {
  public readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  public get name(): string {
    return TestStarted.name;
  }
}

export class TestSucceed extends AbstractEvent {
  public readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  public get name(): string {
    return TestSucceed.name;
  }
}

export class TestFailed extends AbstractEvent {
  public readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  public get name(): string {
    return TestFailed.name;
  }
}

export enum TestState {
  READY,
  RUNNING,
  SUCCESS,
  FAIL,
}

export interface ITest {
  readonly id: string;
  readonly state: TestState;
}

export interface ITestFeature {
  run(): void;
  success(): void;
  fail(): void;
}

/**
 * AbstractAggregate types for test purpose
 */
export class TestAggregate extends AbstractAggregate implements ITest, ITestFeature {
  private _id!: string;
  private _state!: TestState;

  constructor(id?: string) {
    super();
    if (!!id) {
      const event = new TestCreated(id);
      this.applyAndSave(event);
    }
  }

  public run(): void {
    const event = new TestStarted(this._id);
    this.applyAndSave(event);
  }

  public success(): void {
    const event = new TestSucceed(this._id);
    this.applyAndSave(event);
  }

  public fail(): void {
    const event = new TestFailed(this._id);
    this.applyAndSave(event);
  }

  public apply(event: IEvent): TestAggregate {
    switch (event.name) {
      case TestCreated.name:
        return this.applyTestCreated(event as TestCreated);
      case TestStarted.name:
        return this.applyTestStarted();
      case TestSucceed.name:
        return this.applyTestSucceed();
      case TestFailed.name:
        return this.applyTestFailed();
      default:
        return this;
    }
  }

  private applyTestCreated(event: TestCreated): TestAggregate {
    this._id = event.id;
    this._state = TestState.READY;
    return this;
  }

  private applyTestStarted(): TestAggregate {
    this._state = TestState.RUNNING;
    return this;
  }

  private applyTestSucceed(): TestAggregate {
    this._state = TestState.SUCCESS;
    return this;
  }

  private applyTestFailed(): TestAggregate {
    this._state = TestState.FAIL;
    return this;
  }

  public get id(): string {
    return this._id;
  }

  public get state(): TestState {
    return this._state;
  }
}

/**
 * TestProjectionAggregate types for test purpose
 */
export class TestProjection implements IProjection, ITest {
  private _id!: string;
  private _state!: TestState;

  public get id(): string {
    return this._id;
  }

  public get state(): TestState {
    return this._state;
  }

  public stateApplier(): IStateApplier<TestProjection> {
    return new class StateApplier extends AbstractStateApplier<TestProjection> {
      public apply(event: IEvent): TestProjection {
        switch (event.name) {
          case TestCreated.name:
            return this.applyTestCreated(event as TestCreated);
          case TestStarted.name:
            return this.applyTestStarted(event as TestStarted);
          case TestSucceed.name:
            return this.applyTestSucceed(event as TestSucceed);
          case TestFailed.name:
            return this.applyTestFailed(event as TestFailed);
          default:
            return this.projection;
        }
      }

      public applyTestCreated(event: TestCreated): TestProjection {
        this.projection._id = event.id;
        this.projection._state = TestState.READY;
        return this.projection;
      }

      public applyTestStarted(event: TestStarted): TestProjection {
        this.projection._state = TestState.RUNNING;
        return this.projection;
      }

      public applyTestSucceed(event: TestSucceed): TestProjection {
        this.projection._state = TestState.SUCCESS;
        return this.projection;
      }

      public applyTestFailed(event: TestFailed): TestProjection {
        this.projection._state = TestState.FAIL;
        return this.projection;
      }
    }(this);
  }
}

export class TestProjectionAggregate extends AbstractProjectionAggregate<TestProjection> implements ITestFeature {
  constructor(id?: string) {
    super(new TestProjection());
    if (!!id) {
      const event = new TestCreated(id);
      this.applyAndSave(event);
    }
  }

  public run(): void {
    const event = new TestStarted(this._projection.id);
    this.applyAndSave(event);
  }

  public success(): void {
    const event = new TestSucceed(this._projection.id);
    this.applyAndSave(event);
  }

  public fail(): void {
    const event = new TestFailed(this._projection.id);
    this.applyAndSave(event);
  }
}

it('should pass', () => expect(true).toBeTruthy());
