import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwtAuth.guard';

@Module({
  imports: [],
  exports: [JwtStrategy, JwtAuthGuard],
  providers: [],
})
export class JwtModule {}
