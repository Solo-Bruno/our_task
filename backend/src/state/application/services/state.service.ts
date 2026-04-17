import { Injectable, Inject } from '@nestjs/common';
import { StateRepositoryInterface } from '../../domain/repositories/state.repository.interface';

@Injectable()
export class StateService {
  constructor(
    @Inject('StateRepositoryInterface')
    private readonly repository: StateRepositoryInterface,
  ) {}
}
