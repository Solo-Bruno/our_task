import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionOrmEntity } from "./permission.orm-entity";
import { UserOrmEntity } from "./user.orm-entity";

@Entity()
export class RolOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => PermissionOrmEntity, (permission) => permission.roles)
    @JoinTable({ name: 'roles_permissions' })
    permissions?: PermissionOrmEntity[];

    @OneToMany(() => UserOrmEntity, (user) => user.rol)
    users?: UserOrmEntity[];
}