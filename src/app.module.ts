import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule
      inject: [ConfigService], // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        ssl: { rejectUnauthorized: false }, // Required for Neon
        autoLoadEntities: true,
        synchronize: true, // Set to false in production
      }),
    }),
  ],
})
export class AppModule { }
