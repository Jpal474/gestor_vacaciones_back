/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from 'src/roles/roles.entity';
import { UsuarioGenero } from '../usuario-models/usuario-genero-enum';

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nombre_usuario:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    contraseña: string;
}
