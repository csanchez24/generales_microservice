import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gener21 } from 'src/gener21/gener21.entity';
import { Repository } from 'typeorm';
import { CreateGener02Input } from './create-gener02-input';
import { Gener02 } from './gener02.entity';

@Injectable()
export class Gener02Service {
  constructor(
    @InjectRepository(Gener02) private gener02Repository: Repository<Gener02>,
    @InjectRepository(Gener21) private gener21Repository: Repository<Gener21>,
  ) {}

  async getOne(id: number): Promise<Gener02> {
    return this.gener02Repository.findOne(id, { relations: ['roles'] });
  }

  async findByEmail(email: string): Promise<Gener02> {
    return this.gener02Repository.findOne({ email }, { relations: ['roles'] });
  }

  async getAll(): Promise<Gener02[]> {
    return this.gener02Repository.find({ relations: ['roles'] });
  }

  async create(createGener02Input: CreateGener02Input): Promise<Gener02> {
    const { firstName, lastName, email, isActive, password } =
      createGener02Input;

    const roles = await Promise.all(
      createGener02Input.roles.map((id) => this.preloadRoles(id)),
    );

    const gener02 = this.gener02Repository.create({
      firstName,
      lastName,
      email,
      password,
      isActive,
      roles,
    });
    return this.gener02Repository.save(gener02);
  }

  private async preloadRoles(id: number): Promise<Gener21> {
    const existingRole = await this.gener21Repository.findOne(id);
    if (existingRole) {
      return existingRole;
    }
  }
}
