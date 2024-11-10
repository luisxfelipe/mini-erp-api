import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const suppliers = await this.findByCnpjOrEmail(
      createSupplierDto.cnpj,
      createSupplierDto.email,
    ).catch(() => undefined);

    if (suppliers.length > 0) {
      throw new BadRequestException(
        'There is already a supplier with this cnpj and/or email',
      );
    }

    return await this.repository.save(
      this.repository.create(createSupplierDto),
    );
  }

  async findAll(): Promise<Supplier[]> {
    return await this.repository.find();
  }

  async findByCnpjOrEmail(cnpj: string, email: string): Promise<Supplier[]> {
    try {
      return await this.repository.find({
        where: [{ cnpj }, { email }],
      });
    } catch (error) {
      throw new NotFoundException('Supplier not found');
    }
  }

  async findOne(id: number): Promise<Supplier> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Supplier not found');
    }
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const supplier = await this.findOne(id);

    return await this.repository.save({
      ...supplier,
      ...updateSupplierDto,
    });
  }
}
