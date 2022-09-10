import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Direccion } from '../../direcciones/entities/direccion.entity';
import { Documento } from '../../documentos/entities/documento.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  primerNombre: string;

  @Column()
  segundoNombre: string;

  @Column()
  primerApellido: string;

  @Column()
  segundoApellido: string;

  @Column()
  edad: number;

  @Column()
  correo: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Direccion, (direccion) => direccion.cliente, {
    nullable: true,
  })
  direcciones: Direccion[];

  @OneToMany(() => Documento, (documento) => documento.cliente, {
    nullable: true,
  })
  documentos: Documento[];
}
