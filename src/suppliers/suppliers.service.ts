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
import { ReturnSupplierDto } from './dto/return-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repository: Repository<Supplier>,
  ) {}

  async create(
    createSupplierDto: CreateSupplierDto,
  ): Promise<ReturnSupplierDto> {
    const suppliers = await this.findByCnpjOrEmail(
      createSupplierDto.cnpj,
      createSupplierDto.email,
    ).catch(() => undefined);

    if (suppliers.length > 0) {
      throw new BadRequestException(
        'There is already a supplier with this cnpj and/or email',
      );
    }

    const supplier = await this.repository.save(
      this.repository.create(createSupplierDto),
    );

    return new ReturnSupplierDto(supplier);
  }

  async findAll(): Promise<ReturnSupplierDto[]> {
    const suppliers = await this.repository.find();

    return suppliers.map((supplier) => new ReturnSupplierDto(supplier));
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

  async findOne(id: number): Promise<ReturnSupplierDto> {
    try {
      return new ReturnSupplierDto(
        await this.repository.findOneOrFail({
          where: { id },
        }),
      );
    } catch (error) {
      throw new NotFoundException('Supplier not found');
    }
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<ReturnSupplierDto> {
    const supplier = await this.findOne(id);

    return new ReturnSupplierDto(
      await this.repository.save({
        ...supplier,
        ...updateSupplierDto,
      }),
    );
  }
}
