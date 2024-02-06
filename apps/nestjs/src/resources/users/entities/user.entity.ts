import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

import { Role } from '@app/resources/users/enums/role.enum'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', name: 'first_name', length: 150, nullable: true })
  firstName: string | null

  @Column({ type: 'varchar', name: 'last_name', length: 150, nullable: true })
  lastName: string | null

  @Column({ type: 'varchar', length: 150, nullable: true })
  phone: string | null

  @Index()
  @Column({ type: 'varchar', unique: true, length: 150 })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'enum', enum: Role, default: Role.Regular })
  role: Role

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date
}
