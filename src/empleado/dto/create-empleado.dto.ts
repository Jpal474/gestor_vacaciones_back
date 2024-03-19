/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { EmpleadoGenero } from '../empleado-models/empleado-genero.enum';
import { Usuario } from 'src/usuario/usuario.entity';
import { Departamento } from 'src/departamento/departamento.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpleadoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  genero: EmpleadoGenero;

  @ApiProperty()
  @IsNotEmpty()
  usuario: Usuario;

  @ApiProperty()
  @IsNotEmpty()
  departamento: Departamento;
}
