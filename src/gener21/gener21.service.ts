import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGener21Input } from './create-gener21-input';
import { Gener21 } from './gener21.entity';

@Injectable()
export class Gener21Service {
  constructor(
    @InjectRepository(Gener21) private gener21Repository: Repository<Gener21>,
  ) {}

  async getOne(id: number): Promise<Gener21> {
    return this.gener21Repository.findOne({ id }, { relations: ['users'] });
  }

  async getAll(): Promise<Gener21[]> {
    return this.gener21Repository.find({ relations: ['users'] });
  }

  async create(createGener21Input: CreateGener21Input): Promise<Gener21> {
    const { role, description } = createGener21Input;
    const gener21 = this.gener21Repository.create({
      role,
      description,
    });
    return this.gener21Repository.save(gener21);
  }
}
