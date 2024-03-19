import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SaldoVacacionalService } from './saldo-vacacional.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SaldoVacacional } from './saldo-vacacional.entity';
import { CreateSaldoVacacionalDto } from './dto/create-saldovacacional.dto';
import { UpdateSaldoVacacionalDto } from './dto/update-saldovacacional.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('saldo-vacacional')
@ApiTags('Saldo Vacacional')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class SaldoVacacionalController {
  constructor(private saldoService: SaldoVacacionalService) {}

  @ApiOperation({ summary: 'Obtener Saldo Vacacionales del Empleado' })
  @ApiParam({ name: 'iD', description: 'ID del Empleado a obtener' })
  @ApiParam({
    name: 'anio',
    description: 'Año del Saldo Vacacional a actualizar para el empleado',
  })
  @ApiResponse({
    status: 200,
    description:
    'Regresa el saldo vacacional correspondiente al ID de un empleado y el año',
    isArray: false,
    type: SaldoVacacional,
  })
  @Get(':id/:anio')
  getSaldoByUser(
    @Param('id') id: string,
    @Param('anio') anio: number,
  ): Promise<SaldoVacacional> {
    return this.saldoService.getSaldoByEmpleado(id, anio);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Saldo Vacacional' })
  @ApiBody({
    description: 'Datos del Saldo Vacacional del Empleado',
    type: SaldoVacacional,
  })
  @ApiResponse({
    status: 200,
    description:
      'Regresa un objeto con los datos del Saldo Vacacional del Empleo',
    isArray: false,
    type: SaldoVacacional,
  })
  createSaldoVacacional(
    @Body() createSaldoVacacionalDto: CreateSaldoVacacionalDto,
  ) {
    return this.saldoService.createSaldoVacacional(createSaldoVacacionalDto);
  }

  @ApiOperation({
    summary: 'Actualiza los Datos del Saldo Vacacional',
  })
  @ApiResponse({
    status: 200,
    description: 'Acutaliza los datos del Saldo Vacacional',
    isArray: false,
    type: SaldoVacacional,
  })
  @ApiBody({
    description: 'Datos Para el Saldo a ser Actualizados',
    type: SaldoVacacional,
  })
  @ApiParam({
    name: 'id',
    description: 'ID del Empleado',
  })
  @ApiParam({
    name: 'anio',
    description: 'Año del saldo a buscar',
  })
  @Put('/:id/:anio')
  updateSaldoDto(
    @Param('id') id: string,
    @Param('anio') anio: number,
    @Body() updateSaldoDto: UpdateSaldoVacacionalDto,
  ): Promise<SaldoVacacional> {
    return this.saldoService.updateSaldoVacacional(id, anio, updateSaldoDto);
  }
}
