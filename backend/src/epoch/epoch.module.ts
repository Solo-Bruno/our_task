import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpochResolver } from './infrastructure/graphql/resolvers/epoch.resolver';
import { EpochService } from './application/services/epoch.service';
import { EpochOrmEntity } from './infrastructure/persistence/typeorm/entities/epoch.orm-entity';
import { TypeOrmEpochRepository } from './infrastructure/persistence/typeorm/repositories/typeorm-epoch.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EpochOrmEntity])],
  providers: [
    EpochResolver,
    EpochService,
    {
      provide: 'EpochRepositoryInterface',
      useClass: TypeOrmEpochRepository,
    },
  ],
  exports: [EpochService],
})
export class EpochModule {}
