import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({type: "varchar"})
    nombre: string

    @Column({type: "varchar"})
    apellido: string

    @Column({type: "varchar"})
    direccion: string

    @Column({unique: true})
    telefono: number
    @Column({unique: true})
    correo: string
    

}

//add unique. 
