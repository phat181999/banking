import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [join(__dirname, '../../**/*.entity.{ts,js}')], // Adjust path according to your structure
  migrationsRun: true, //TypeORM will automatically run any pending migrations when the application starts, ensuring the tables are created if they are missing
  synchronize: true, // Set to false in production
});

export default getTypeOrmConfig;
