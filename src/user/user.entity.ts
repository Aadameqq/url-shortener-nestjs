import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Redirect } from '../redirect/redirect.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public username: string;

  @Column()
  password: string;

  @OneToMany(() => Redirect, (redirect) => redirect.owner, { cascade: true })
  redirects: Redirect[];

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  addRedirect = (redirect: Redirect) => {
    this.redirects.push(redirect);
  };
}
