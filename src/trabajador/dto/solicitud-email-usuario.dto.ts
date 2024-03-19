import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class EmailSolicitudEmpleado {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  destinatarios: string[];
}
