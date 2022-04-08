import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { BarbersController } from './barbers/barbers.controller';
import { BarbersService } from './barbers/barbers.service';
import { BarbersModule } from './barbers/barbers.module';

@Module({
  imports: [
    UsersModule,
    // ProductsModule,
  
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'booking',
      password: 'booking',
      database: 'booking',
      synchronize: true,
      //everything whats contains .entity, thats the elements of db (remember entieties.js)
      entities: ['**/*.entity.js']
    }),
    AuthModule,
    BarbersModule,

  ],
  controllers: [AppController, AuthController, BarbersController],
  providers: [AppService, BarbersService],
})
export class AppModule {}