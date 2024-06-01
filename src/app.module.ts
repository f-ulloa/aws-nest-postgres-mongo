import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerModule } from './domain/customer/customer.module';
import { CustomerRequestModule } from './domain/customer-request/customer-request.module';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { BranchOfficeModule } from './domain/branch-office/branch-office.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const databaseSQLOpts: TypeOrmModuleOptions = {
          ...config.get<object>('databaseSQL'),
          entities: [Customer],
          autoLoadEntities: true,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
        return databaseSQLOpts;
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const mongooseOpts: MongooseModuleOptions = {
          uri: config.get<string>('mongoose.uri'),
        };
        return mongooseOpts;
      },
      inject: [ConfigService],
    }),
    CustomerModule,
    CustomerRequestModule,
    BranchOfficeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
