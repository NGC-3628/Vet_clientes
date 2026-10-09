import { IsEmail, IsIn, IsInt, IsNumber, isString, IsString } from "class-validator";

export class CreateClienteDto {
    @IsString()
    nombre: string 
    @IsString()
    direccion: string
    @IsNumber()
    telefono: number
    @IsString()
    @IsEmail()
    correo: string 

}
