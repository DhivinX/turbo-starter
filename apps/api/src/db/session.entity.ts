import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  @JoinColumn()
  @Index()
  user: User;

  @Column({
    nullable: true,
    default: null,
  })
  token: string;

  @Column({
    type: 'bigint',
    nullable: true,
    default: null,
  })
  exp: number;

  @Column({
    default: false,
  })
  cookies: boolean;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastSeen: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
