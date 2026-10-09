import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ){}
  
  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente  = this.clienteRepository.create(createClienteDto)
      await this.clienteRepository.save(cliente)
      return{
        "mensaje" : "cliente creado",
        "cliente" : cliente
      }
    } catch (error) {
      throw new BadRequestException("error en la creación del cliente")
    }
  }


  findAll() {
    try {
      const cliente = this.clienteRepository.find({})
      return{
        "mensajes": "lista de clientes",
        "cliente": cliente
      }
    } catch (error) {
      throw new BadRequestException("no se pudo hacer la lista de los clientes")
    }

  }
  

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
