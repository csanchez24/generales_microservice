import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Gener02 } from 'src/gener02/gener02.entity';
import { Gener02Type } from 'src/gener02/gener02.type';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginInput } from './login-input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthType, { nullable: true })
  async login(@Args('loginInput') loginInput: LoginInput) {
    const { email, password } = loginInput;
    const gener02 = await this.authService.validateUser(email, password);
    if (!gener02) {
      throw new Error('Invalid email or password');
    }
    return this.authService.login(gener02);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Gener02Type)
  async getProfile(@CurrentUser() gener02: Gener02) {
    return gener02;
  }
}
