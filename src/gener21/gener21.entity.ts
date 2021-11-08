import { Gener02 } from 'src/gener02/gener02.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gener21 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  description: string;

  @ManyToMany(() => Gener02, (gener02) => gener02.roles)
  users: Gener02[];
}
