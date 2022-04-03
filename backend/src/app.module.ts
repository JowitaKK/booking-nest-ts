import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

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

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}