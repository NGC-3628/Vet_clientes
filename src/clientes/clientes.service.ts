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
        console.error('Error al crear mascota:', (error as Error).message);
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


  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  async remove(id: number) {
    try {
      await this.clienteRepository.delete(id);
      console.log(`Cliente ${id} eliminado de la base de datos local.`);
    } catch (error) {
      throw new BadRequestException(`No se pudo eliminar el cliente #${id}`);
    }

    try {
      const ipDeLee = ''; 
      const urlB2 = `http://${ipDeLee}:3002/mascotas/dueno/${id}`;
      
      await firstValueFrom(this.httpService.delete(urlB2));
      
      return { 
        mensaje: `Cliente ${id} eliminado. Petición en cascada enviada a Mascotas exitosamente.` 
      };
    } catch (error) {
      console.error('Error al borrar mascotas con Lee:', (error as Error).message);
      return { 
        mensaje: `Cliente ${id} eliminado de tu BD, pero falló la conexión para borrar sus mascotas.` 
      };
    }
    }
  }
