import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  c_name: string;

  @Column()
  c_slug: string;

  @Column()
  c_avatar: string;

  @Column()
  c_banner: string;

  @Column()
  c_description: string;

  @Column()
  c_hot: number;

  @Column()
  c_status: boolean;
}
