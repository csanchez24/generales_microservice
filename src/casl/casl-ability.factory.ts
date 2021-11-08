import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Gener02 } from 'src/gener02/gener02.entity';
import { Gener05 } from 'src/gener05/gener05.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<typeof Gener05 | typeof Gener02>
  | 'all'
  | 'Gener05';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Gener02) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.find((gener21) => gener21.role === 'admin')) {
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Manage, 'all');
      can(Action.Read, 'Gener05');
      can(Action['Read'], Gener05);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
