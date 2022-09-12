import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Redirect {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public url: string;

  @ManyToOne(() => User, (user) => user.redirects, { onDelete: 'CASCADE' })
  public owner: User;

  @Column({ default: 0 })
  public useCount: number;

  constructor(url: string, owner: User, useCount = 0) {
    this.url = url;
    this.owner = owner;
    this.useCount = useCount;
  }
}
