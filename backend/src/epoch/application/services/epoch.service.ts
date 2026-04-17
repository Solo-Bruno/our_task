import { Injectable, Inject } from '@nestjs/common';
import { EpochRepositoryInterface } from '../../domain/repositories/epoch.repository.interface';

@Injectable()
export class EpochService {
  constructor(
    @Inject('EpochRepositoryInterface')
    private readonly repository: EpochRepositoryInterface,
  ) {}
}
