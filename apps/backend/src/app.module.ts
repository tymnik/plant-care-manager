import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { PlantModule } from './plant/plant.module';
import { BasePrismaCrudService } from './shared/classes/BasePrismaCrudService';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,
    // PlantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
