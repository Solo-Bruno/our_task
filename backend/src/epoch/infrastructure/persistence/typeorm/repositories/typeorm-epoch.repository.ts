import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EpochRepositoryInterface } from '../../../../domain/repositories/epoch.repository.interface';
import { EpochOrmEntity } from '../entities/epoch.orm-entity';

@Injectable()
export class TypeOrmEpochRepository implements EpochRepositoryInterface {
  constructor(
    @InjectRepository(EpochOrmEntity)
    private readonly repository: Repository<EpochOrmEntity>,
  ) {}
}
