import { IsEmail, IsNumber, IsString, IsBoolean, IsOptional, IsObject } from "class-validator";

export class CreateClienteDto {
    @IsOptional()
    @IsBoolean()
    primeraVez?: boolean;

    @IsString()
    nombre: string;

    //AGG apellido
    @IsString()
    apellido: string;

    @IsString()
    direccion: string;

    @IsNumber()
    telefono: number;

    @IsString()
    @IsEmail()
    correo: string;
}