import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly httpService: HttpService
  ) {}
  
  async create(createClienteDto: CreateClienteDto) {
    let clienteGuardado;

    try {
      const cliente = this.clienteRepository.create(createClienteDto);
      clienteGuardado = await this.clienteRepository.save(cliente);
    } catch (error) {
      throw new BadRequestException("Error en la creacion del cliente en la base de datos");
    }

    const payloadParaB2 = {
      cliente_id: clienteGuardado.id, 
      mascota: createClienteDto.mascota,
      cita: createClienteDto.cita
    };

    
    try {
      const ipDeLee = ''; 
      const urlB2 = `http://${ipDeLee}:3002/mascotas`;
      
      const respuesta = await firstValueFrom(this.httpService.post(urlB2, payloadParaB2));
      
      return {
        mensaje: "Cliente creado exitosamente. enviando a Mascotas.",
        cliente: clienteGuardado,
        respuestaMascotas: respuesta.data
      };
    } catch (error) {
      console.error('Error al conectar con Lee:', error.message);
      return { 
        mensaje: "Cliente creado en tu BD, yet, fallo en conexion a servidor.",
        cliente: clienteGuardado 
      };
    }
  }

  async findAll() {
    try {
      const clientes = await this.clienteRepository.find({});
      return {
        mensajes: "lista de clientes",
        clientes: clientes
      };
    } catch (error) {
      throw new BadRequestException("No se pudo hacer la lista de los clientes");
    }
  }
}