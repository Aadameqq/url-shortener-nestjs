import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endpointUri: string;
  @Column()
  timeInMilliseconds: number;

  constructor(endpointUri, timeInMilliseconds) {
    this.endpointUri = endpointUri;
    this.timeInMilliseconds = timeInMilliseconds;
  }
}
