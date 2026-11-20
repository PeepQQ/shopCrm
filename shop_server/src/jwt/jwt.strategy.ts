import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.access_token,
      ]),
      secretOrKey: process.env['JWT_SECRET']!,
    });
  }

  async validate(payload: { sub: number }) {
    const user = await this.userService.userData(payload.sub);

    return user;
  }
}
