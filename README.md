# Event Sourcing

A lib to help building event sourced applications.

## How to use

### Aggregate

#### Implement yourself the IAggregate and IEvent interfaces

```typescript
// src/domain/events/user-created.event.ts
import { IEvent } from '@thomrick/event-sourcing';
import { UserAggregate } from '../aggregates':

export class UserCreated implements IEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;

  constructor(id: string, email: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }

  public apply(aggregate: UserAggregate): UserAggregate {
    return aggregate.apply(this);
  }

  public get name(): string {
    return UserCreated.name;
  }
}

// src/domain/aggregates/user.aggregate.ts
import { IAggregate, IEvent } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';

export class UserAggregate implements IAggregate {
  private _id: string;
  private _email: string;
  private _password: string;
  private _username: string;

  private readonly _uncommittedChanges: IEvent[] = [];

  constructor(id?: string, email?: string, password?: string, username?: string) {
    if (!!id && !!email && !!password && username) {
      const event = new UserCreated(id, email, password, username);
      this.apply(event);
      this.save(event);
    }
  }

  public apply(event: IEvent): UserAggregate {
    switch (event.name) {
      case UserCreated.name:
        return this.applyUserCreated(event as UserCreated);
      default:
        return this;
    }
  }

  private applyUserCreated(ervent: UserCreated): UserAggregate {
    this._id = event.id;
    this._email = event.email;
    this._password = event.password;
    this._username = event.username;
    return this;
  }

  public rebuild(events: IEvent): UserAggregate {
    return events.reduce((aggregate, event) => event.apply(aggregate), this);
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get username(): string {
    return this._username;
  }

  private save(event: IEvent): void {
    this._uncommittedChanges.push(event);
  }

  public get uncommittedChanges(): IEvent {
    return this._uncommittedChanges;
  }

}
```

#### Use the AbstractAggregate and AbstractEvent to do some magic for you

```typescript
// src/domain/events/user-created.event.ts
import { AbstractEvent } from '@thomrick/event-sourcing';
import { UserAggregate } from '../aggregates':

export class UserCreated extends AbstractEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;

  constructor(id: string, email: string, password: string, username: string) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }

  public get name(): string {
    return UserCreated.name;
  }
}

// src/domain/aggregates/user.aggregate.ts
import { AbstractAggregate, IEvent } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';

export class UserAggregate extends AbstractAggregate {
  private _id: string;
  private _email: string;
  private _password: string;
  private _username: string;

  constructor(id?: string, email?: string, password?: string, username?: string) {
    super();
    if(!!id && !!email && !!pasword && !!username) {
      const event = new UserCreated(id, email, password, username);
      this.applyAndSave(event);
    }
  }

  public apply(event: IEvent): UserAggregate {
    switch (event.name) {
      case UserCreated.name:
        return this.applyUserCreated(event as UserCreated);
      default:
        return this;
    }
  }

  private applyUserCreated(ervent: UserCreated): UserAggregate {
    this._id = event.id;
    this._email = event.email;
    this._password = event.password;
    this._username = event.username;
    return this;
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get username(): string {
    return this._username;
  }
}
```

### Projection & Aggregate

#### Implement yourself the IProjection, IProjectionAggregate and IEvent interfaces

```typescript
// src/domain/events/user-created.event.ts
import { IEvent } from '@thomrick/event-sourcing';
import { UserAggregate } from '../aggregates';
import { UserProjection } from '../projections';

export class UserCreated implements IEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;

  constructor(id: string, email: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }

  public apply(state: IStateApplier<UserProjection>): UserProjection {
    return state.apply(this);
  }

  public get name(): string {
    return UserCreated.name;
  }
}

// src/domain/projections/user.projection.ts
import { IEvent, IProjection, IStateApplier } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';

export class UserProjection implements IProjection {
  private _id: string;
  private _email: string;
  private _password: string;
  private _username: string;

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get username(): string {
    return this._username;
  }

  public stateApplier(): IStateApplier<UserProjection> {
    return new class StateApplier implements IStateApplier<UserProjection> {
      private projection: UserProjection;

      constructor(projection: UserProjection) {
        this.projection = projection;
      }

      public apply(event: IEvent): UserProjection {
        switch (event.nam) {
          case UserCreated.name:
            return this.applyUserCreated(event as UserCreated);
          default:
            return this.projection;
        }
      }

      public applyUserCreated(event: UserCreated): UserProjection {
        this.projection._id = event.id;
        this.projection._email = event.email;
        this.projection._password = event.password;
        this.projection._username = event.username;
        return this.projection;
      }
    }(this);
  }
}

// src/domain/aggregates/user.aggregate.ts
import { IAggregate, IEvent } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';

export class UserAggregate implements IAggregate {
  private readonly _uncommittedChanges: IEvent[] = [];
  private _projection: UserProjection;

  constructor(id?: string, email?: string, password?: string, username?: string) {
    if (!!id && !!email && !!pasword && !!username) {
      const event = new UserCreated(id, email, password, username);
      this.apply(event);
      this.save(event);
    }
  }

  public apply(event: IEvent): UserAggregate {
    this._projection.stateApplier().apply(event);
    return this;
  }

  public rebuild(events: IEvent): UserAggregate {
    return events.reduce((aggregate, event) => event.apply(aggregate), this);
  }

  public get uncommittedChanges(): IEvent {
    return this._uncommittedChanges;
  }

  public get projection(): UserProjection {
    return this._projection
  }

}
```

#### Use the AbstractProjectionAggregate, AbstractEvent, AbstractStateApplier to do some magic for you

```typescript
// src/domain/events/user-created.event.ts
import { AbstractEvent } from '@thomrick/event-sourcing';
import { UserAggregate } from '../aggregates';
import { UserProjection } from '../projections';

export class UserCreated implements AbstractEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;

  constructor(id: string, email: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }

  public get name(): string {
    return UserCreated.name;
  }
}

// src/domain/projections/user.projection.ts
import { IEvent, IProjection, IStateApplier, AbstractStateApplier } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';

export class UserProjection implements IProjection {
  private _id: string;
  private _email: string;
  private _password: string;
  private _username: string;

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get username(): string {
    return this._username;
  }

  public stateApplier(): IStateApplier<UserProjection> {
    return new class StateApplier extends AbstractStateApplier<UserProjection> {
      public apply(event: IEvent): UserProjection {
        switch (event.nam) {
          case UserCreated.name:
            return this.applyUserCreated(event as UserCreated);
          default:
            return this.projection;
        }
      }

      public applyUserCreated(event: UserCreated): UserProjection {
        this.projection._id = event.id;
        this.projection._email = event.email;
        this.projection._password = event.password;
        this.projection._username = event.username;
        return this.projection;
      }
    }(this);
  }
}

// src/domain/aggregates/user.aggregate.ts
import { IAggregate, IEvent } from '@thomrick/event-sourcing';
import { UserCreated } from '../events';

export class UserAggregate extends AbstractProjectionAggregate<UserProjection> {
  constructor(id?: string, email?: string, password?: string, username?: string) {
    super(new UserProjection());
    if (!!id && !!email && !!password && !!username) {
      const event = new UserCreated(id, email, password, username);
      this.applyAndSave(event);
    }
  }

  private save(event: IEvent): void {
    this._uncommittedChanges.push(event);
  }

  public get uncommittedChanges(): IEvent {
    return this._uncommittedChanges;
  }

  public get projection(): UserProjection {
    return this._projection
  }
}
```
