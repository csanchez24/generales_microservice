import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Gener02Service } from 'src/gener02/gener02.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private gener02Service: Gener02Service) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any) {
    const gener02 = this.gener02Service.getOne(payload.sub);
    if (!gener02) {
      throw new UnauthorizedException();
    }
    return gener02;
  }
}
