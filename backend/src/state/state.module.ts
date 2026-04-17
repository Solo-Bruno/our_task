import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateResolver } from './infrastructure/graphql/resolvers/state.resolver';
import { StateService } from './application/services/state.service';
import { StateOrmEntity } from './infrastructure/persistence/typeorm/entities/state.orm-entity';
import { TypeOrmStateRepository } from './infrastructure/persistence/typeorm/repositories/typeorm-state.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StateOrmEntity])],
  providers: [
    StateResolver,
    StateService,
    {
      provide: 'StateRepositoryInterface',
      useClass: TypeOrmStateRepository,
    },
  ],
  exports: [StateService],
})
export class StateModule {}
