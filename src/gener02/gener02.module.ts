import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gener21 } from 'src/gener21/gener21.entity';
import { Gener02 } from './gener02.entity';
import { Gener02Resolver } from './gener02.resolver';
import { Gener02Service } from './gener02.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gener02, Gener21])],
  providers: [Gener02Resolver, Gener02Service],
  exports: [Gener02Service],
})
export class Gener02Module {}
