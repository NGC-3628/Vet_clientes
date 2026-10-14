import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    private readonly httpService: HttpService,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const existe = await this.clienteRepository.findOneBy([
      { correo: createClienteDto.correo },
      { telefono: createClienteDto.telefono },
    ]);
    //primero amos a checar si un wey ya existe
    if (existe) {
      throw new ConflictException('Cliente ya registrado, weyote');
    }

    try {
      const cliente = this.clienteRepository.create(createClienteDto);
      const clienteGuardado = await this.clienteRepository.save(cliente);

      return {
        message: 'Cliente registrado exitosamente mai',
        cliente: clienteGuardado,
      };
    } catch (error: any) {
      throw new InternalServerErrorException('No se guardó nada pto');
    }
  }

  async findAll() {
    try {
      const clientes = await this.clienteRepository.find();
      return {
        mensajes: 'lista de clientes',
        clientes: clientes,
      };
    } catch (error) {
      throw new BadRequestException(
        'No se pudo hacer la lista de los clientes',
      );
    }
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id: id });

    if (!cliente) {
      throw new NotFoundException('no existe ese wey');
    }
    return {
      message: 'cliente encontrado pto',
      cliente: cliente,
    };
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

      await firstValueFrom(this.httpService.delete(urlB2, { timeout: 5000 }));

      return {
        mensaje: `Cliente ${id} eliminado. enviando a Mascotas exitosamente.`,
      };
    } catch (error) {
      return {
        mensaje: `Cliente ${id} eliminado de tu BD, fallo en la conexion anyways.`,
      };
    }
  }
}
