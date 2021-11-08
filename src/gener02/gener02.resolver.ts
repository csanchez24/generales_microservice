import { Args, Int, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { CreateGener02Input } from './create-gener02-input';
import { Gener02Service } from './gener02.service';
import { Gener02Type } from './gener02.type';

@Resolver(() => Gener02Type)
export class Gener02Resolver {
  constructor(private gener02Service: Gener02Service) {}

  @Query(() => Gener02Type, { name: 'gener02' })
  async getGener02(@Args('id', { type: () => Int }) id: number) {
    return this.gener02Service.getOne(id);
  }

  @Query(() => [Gener02Type], { name: 'allGener02' })
  async getAllGener02() {
    return this.gener02Service.getAll();
  }

  @Mutation(() => Gener02Type)
  createGener02(
    @Args('createGener02Input') createGener02Input: CreateGener02Input,
  ) {
    return this.gener02Service.create(createGener02Input);
  }
}
