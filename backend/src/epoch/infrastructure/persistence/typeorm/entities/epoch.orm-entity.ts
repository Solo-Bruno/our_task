import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectOrmEntity } from '../../../../../project/infrastructure/persistence/typeorm/entities/project.orm-entity';
import { StateOrmEntity } from '../../../../../state/infrastructure/persistence/typeorm/entities/state.orm-entity';

@Entity('epochs')
export class EpochOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column()
  startedAt: Date;

  @Column()
  endedAt: Date;

  @Column()
  color: string;

  @ManyToOne(() => ProjectOrmEntity, (project) => project.epochs)
  project: ProjectOrmEntity;

  @OneToMany(() => StateOrmEntity, (state) => state.epoch)
  states?: StateOrmEntity[];
}
