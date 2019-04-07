import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DomainsController } from './domains.controller'
import { DomainsService } from './domains.service'
import { Domain } from './domain.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Domain])],
  controllers: [DomainsController],
  providers: [DomainsService],
})
export class DomainsModule {}
