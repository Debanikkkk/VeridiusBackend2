import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ECUFlash {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 128,
  })
  flashFileName?: string;

  @Column({
    length: 'MAX',
  })
  flashFileContent?: string;
}
