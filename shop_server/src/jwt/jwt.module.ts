import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwtAuth.guard';
import { OptionalJwtAuthGuard } from './optionalJwtAuth.guard';

@Module({
  imports: [],
  exports: [JwtStrategy, JwtAuthGuard, OptionalJwtAuthGuard],
  providers: [],
})
export class JwtModule {}
