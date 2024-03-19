import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Usuario } from 'src/usuario/usuario.entity';
import { TrabajadorService } from './trabajador.service';
import { Empleado } from 'src/empleado/empleado.entity';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateDateColumn } from 'typeorm';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from 'src/email/email.service';
import { EmailSolicitudEmpleado } from './dto/solicitud-email-usuario.dto';

@Controller('trabajador')
@ApiTags('Trabajadores')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TrabajadorController {
  constructor(
    private trabajadorService: TrabajadorService,
    private mailService: EmailService,
  ) {}

  @ApiOperation({ summary: 'Obtener lista de Trabajadores' })
  @ApiParam({
    name: 'size',
    description: 'Tamaño de registros a mostrar en front',
  })
  @ApiParam({
    name: 'number',
    description: 'Número de página a mostrar en front',
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa un Array de Trabajadores',
    isArray: true,
    type: Empleado,
  })
  @Get('/:size/:number')
  getTrabajadores(
    @Param('size') size: number,
    @Param('number') number: number,
  ): Promise<{ trabajadores: Empleado[]; pages: number }> {
    const anio = new Date().getFullYear();
    return this.trabajadorService.getTrabajadores(
      'Trabajador',
      size,
      number,
      anio,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Crea un Trabajador' })
  @ApiBody({
    description: 'Datos del Trabajador a Registrar',
    type: Empleado,
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con los datos del Trabajador',
    isArray: true,
    type: Empleado,
  })
  createTrabajador(
    @Body() createTrabajadorDto: CreateTrabajadorDto,
  ): Promise<Empleado> {
    return this.trabajadorService.createTrabajador(createTrabajadorDto);
  }

  @Post('email')
  @ApiOperation({
    summary: 'Envio de mail de notificación de solicitud creada',
  })
  @ApiResponse({
    status: 200,
    description: 'El Mail ha sido enviado de forma éxitosamente',
  })
  @ApiBody({
    description: 'Mail de Notificación de creación de solicitud', 
    type:EmailSolicitudEmpleado
  })
  async enviarMail(@Body() mail: EmailSolicitudEmpleado) {
    try {
      const htmlContent = `
      <h1>Solicitud Vacacional</h1>
      <p>${mail.nombre} ha creado una solicitud, revise la página y apruebela o rechacela antes de que esta expire</p>
    `;
      await this.mailService.sendMailTrabajador(
        mail.destinatarios,
        'Nueva Solicitud',
        htmlContent,
      );
      return true;
    } catch (error) {
      console.log(error);
      return 'Error al enviar el correo';
    }
  }

  @ApiOperation({ summary: 'Actualiza los datos del trabajador' })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con los datos del Trabajador Actualizado',
    isArray: false,
    type: Empleado,
  })
  @ApiParam({ name: 'id', description: 'ID del Trabajador' })
  @ApiBody({
    description: 'Datos Actualizados del Trabajador',
    type: UpdateDateColumn,
  })
  @Put('/:id')
  updateTrabajadorDto(
    @Param('id') id: string,
    @Body()
    updateTrabajadorDto: UpdateTrabajadorDto,
  ): Promise<Empleado> {
    return this.trabajadorService.updateTrabajador(id, updateTrabajadorDto);
  }

  @ApiOperation({ summary: 'Borra al Trabajador acorde a su ID' })
  @ApiResponse({
    status: 200,
    description: 'Regresa true en caso de que el borrado haya sido éxitoso',
    isArray: false,
    type: Boolean,
  })
  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'ID del Trabajador' })
  deleteTrabajador(@Param('id') id: string): Promise<boolean> {
    return this.trabajadorService.deleteTrabajador(id);
  }
}
