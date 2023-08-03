import { Module } from '@nestjs/common';
import { UserModule } from '@entities/user/user.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { ConfigEnvModule } from './comfig.module';

@Module({
  imports: [UserModule, TypeOrmModule, ConfigEnvModule],
})
export class AppModule {}
