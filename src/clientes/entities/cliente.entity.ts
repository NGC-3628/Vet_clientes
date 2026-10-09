import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({type: "varchar"})
    nombre: string
    @Column({type: "varchar"})
    direccion: string
    @Column()
    telefono: number
    @Column()
    correo: string
    

}
