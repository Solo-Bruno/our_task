import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolOrmEntity } from "./rol.orm-entity";

@Entity()
export class PermissionOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => RolOrmEntity, (rol) => rol.permissions)
    roles?: RolOrmEntity[];
}