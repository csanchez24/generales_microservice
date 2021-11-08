import { Module } from '@nestjs/common';
import { Gener21Service } from './gener21.service';
import { Gener21Resolver } from './gener21.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gener21 } from './gener21.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gener21])],
  providers: [Gener21Service, Gener21Resolver],
})
export class Gener21Module {}
