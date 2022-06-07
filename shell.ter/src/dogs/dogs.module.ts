import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { Dog } from './entities/dog';
import { Walk } from '../walks/entities/walk';
import { User } from '../users/entity/user';

@Module({
  imports: [MikroOrmModule.forFeature({entities: [Dog,Walk,User]})],
  providers: [DogsService],
  controllers: [DogsController]
})
export class DogsModule {}