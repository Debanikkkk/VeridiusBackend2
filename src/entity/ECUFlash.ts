import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ECUFlash {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 128,
  })
  flash_file_name?: string;

  //   @Column({
  //     length: 'MAX',
  //   })
  //   flashFileContent?: string;
}
