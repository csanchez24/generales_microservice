import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/casl/police.guard';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { CreateGener05Input } from './create-gener05-input';
import { Gener05 } from './gener05.entity';
import { Gener05Service } from './gener05.service';
import { Gener05Type } from './gener05.type';

@Resolver()
export class Gener05Resolver {
  constructor(private gener05Service: Gener05Service) {}

  @Query(() => Gener05Type, { name: 'gener05' })
  async getGener05(@Args('id', { type: () => Int }) id: number) {
    return this.gener05Service.getOne(id);
  }

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Gener05))
  @Query(() => [Gener05Type], { name: 'allGener05' })
  async getAllGener05() {
    return this.gener05Service.getAll();
  }

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Gener05'))
  @Mutation(() => Gener05Type)
  createGener05(
    @Args('createGener05Input') createGener05Input: CreateGener05Input,
  ) {
    return this.gener05Service.create(createGener05Input);
  }
}
