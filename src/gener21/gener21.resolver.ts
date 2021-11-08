import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGener21Input } from './create-gener21-input';
import { Gener21Service } from './gener21.service';
import { Gener21Type } from './gener21.type';

@Resolver()
export class Gener21Resolver {
  constructor(private gener21Service: Gener21Service) {}

  @Query(() => Gener21Type, { name: 'gener21' })
  async getGener21(@Args('id', { type: () => Int }) id: number) {
    return this.gener21Service.getOne(id);
  }

  @Query(() => [Gener21Type], { name: 'allGener21' })
  async getAllGener21() {
    return this.gener21Service.getAll();
  }

  @Mutation(() => Gener21Type)
  createGener21(
    @Args('createGener21Input') createGener21Input: CreateGener21Input,
  ) {
    return this.gener21Service.create(createGener21Input);
  }
}
