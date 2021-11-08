import { Injectable } from '@nestjs/common';
import { Gener02Service } from 'src/gener02/gener02.service';
import { JwtService } from '@nestjs/jwt';
import { Gener02 } from 'src/gener02/gener02.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private gener02Service: Gener02Service,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const gener02 = await this.gener02Service.findByEmail(email);
    if (!gener02) return null;
    const isMatch = await bcrypt.compare(password, gener02.password);
    if (isMatch) {
      return gener02;
    }
    return null;
  }

  async login(user: Gener02) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
