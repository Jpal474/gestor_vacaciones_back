/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contrasenia: string;
}
