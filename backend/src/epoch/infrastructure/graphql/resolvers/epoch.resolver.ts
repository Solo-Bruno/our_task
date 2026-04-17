import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EpochGraphQLModel } from '../types/epoch.type';
import { EpochService } from '../../../application/services/epoch.service';
import { CreateEpochInput } from '../../../application/dto/create-epoch.input';

@Resolver(() => EpochGraphQLModel)
export class EpochResolver {
  constructor(private readonly service: EpochService) {}
}
