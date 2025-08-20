import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ControllersModule } from './gateways/controllers/controllers.module'
import { DomainModule } from './domain/domain.module'
import { DatabaseModule } from './infrastructure/database/database.module'
import { AuthModule } from './infrastructure/auth/auth.module'
import { GatewaysModule } from './gateways/gateways.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module'

@Module({
  imports: [
    ControllersModule,
    DomainModule,
    InfrastructureModule,
    DatabaseModule,
    AuthModule,
    GatewaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
