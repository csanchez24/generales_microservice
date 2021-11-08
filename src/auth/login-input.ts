import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @MinLength(5)
  email: string;

  @Field()
  @MinLength(4)
  password: string;
}
