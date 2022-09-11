import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { ClientesModule } from './clientes/clientes.module';
import { CommonModule } from './common/common.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { DocumentosModule } from './documentos/documentos.module';
import { LocalfilesModule } from './local-file/localfiles.module';
import { ReportesModule } from './reportes/reportes.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    UsuariosModule,
    ClientesModule,
    DireccionesModule,
    DocumentosModule,
    AuditoriaModule,
    CommonModule,
    LocalfilesModule,
    ReportesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
