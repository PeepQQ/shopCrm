import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private adminService: AdminService,
  ) {
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
