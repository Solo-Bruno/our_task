import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateRepositoryInterface } from '../../../../domain/repositories/state.repository.interface';
import { StateOrmEntity } from '../entities/state.orm-entity';

@Injectable()
export class TypeOrmStateRepository implements StateRepositoryInterface {
  constructor(
    @InjectRepository(StateOrmEntity)
    private readonly repository: Repository<StateOrmEntity>,
  ) {}
}
