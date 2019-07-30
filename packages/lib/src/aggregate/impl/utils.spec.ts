import { AbstractEvent, IEvent } from '../../event';
import { AbstractAggregate } from './abstract.aggregate';

export enum TestState {
  READY,
  RUNNING,
  SUCCESS,
  FAIL,
}

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

export class TestAggregate extends AbstractAggregate {
  private _id!: string;
  private _state!: TestState;

  constructor(id?: string) {
    super();
    if (!!id) {
      const event = new TestCreated(id);
      this.apply(event);
      this.save(event);
    }
  }

  public run(): void {
    const event = new TestStarted(this._id);
    this.apply(event);
    this.save(event);
  }

  public success(): void {
    const event = new TestSucceed(this._id);
    this.apply(event);
    this.save(event);
  }

  public fail(): void {
    const event = new TestFailed(this._id);
    this.apply(event);
    this.save(event);
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

it('should pass', () => expect(true).toBeTruthy());
