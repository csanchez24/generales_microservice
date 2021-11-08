import { Module } from '@nestjs/common';
import { Gener05Service } from './gener05.service';
import { Gener05Resolver } from './gener05.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gener05 } from './gener05.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gener05]), CaslModule],
  providers: [Gener05Service, Gener05Resolver],
})
export class Gener05Module {}
