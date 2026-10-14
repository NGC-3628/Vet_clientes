import { IsEmail, IsNumber, IsString, IsBoolean, IsOptional, IsObject, IsNotEmpty, MaxLength } from "class-validator";

export class CreateClienteDto {

    @IsString()
    nombre: string;

    //AGG apellido
    @IsString()
    apellido: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    telefono: string; 

    @IsString()
    direccion: string;

    @IsString()
    @IsEmail()
    correo: string;
}