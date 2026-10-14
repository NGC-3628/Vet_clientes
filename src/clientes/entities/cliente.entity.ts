import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  apellido: string;

  @Column({ unique: true, type: 'varchar' })
  telefono: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ unique: true })
  correo: string;
}

//add unique.
