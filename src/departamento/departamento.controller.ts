import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { Departamento } from './departamento.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('departamento')
@ApiTags('Departamentos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class DepartamentoController {
  constructor(private departamentosService: DepartamentoService) {}

  @ApiOperation({ summary: 'Obtener todos los departamentos sin paginacion' })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto cpn los datos del Departamento Encontrado',
    isArray: true,
    type: Departamento,
  })
  @Get()
  getAllDepartamentos(): Promise<Departamento[]> {
    return this.departamentosService.getAllDepartamentos();
  }
  
  @ApiOperation({ summary: 'Obtener Departamento a partir de su ID' })
  @ApiParam({ name: 'id', description: 'ID del Departamento a buscar' })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con los datos del Departamento encontrado',
    isArray: false,
    type: Departamento,
  })
  @Get('/:id')
  getDepartamentoById(@Param('id') id: number): Promise<Departamento> {
    return this.departamentosService.getDepartamentoById(id);
  }

  @ApiOperation({ summary: 'Obtener todos los departamentos' })
  @ApiParam({
    name: 'size',
    description: 'Numero de elementos a mostrar en el front',
  })
  @ApiParam({
    name: 'number',
    description: 'Numero de página a obtener para mostrar en front',
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa un arreglo con los datos de los departamentos',
    isArray: true,
    type: Departamento,
  })
  @Get('/:size/:number')
  getDepartamentos(
    @Param('size') size: number,
    @Param('number') number: number,
  ): Promise<{ departamentos: Departamento[]; pages: number }> {
    return this.departamentosService.getDepartamentos(size, number);
  }

  @ApiOperation({ summary: 'Crear Departamento' })
  @ApiBody({
    description: 'Datos del Departamento',
    type: CreateDepartamentoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa una objeto con los datos del departamento creado',
    isArray: false,
    type: Departamento,
  })
  @Post()
  createDepartamento(@Body() createDepartamentoDto): Promise<Departamento> {
    return this.departamentosService.createDepartamento(createDepartamentoDto);
  }

  @ApiOperation({ summary: 'Elimina un Departamento por su ID' })
  @ApiParam({ name: 'id', description: 'ID del Departamento' })
  @ApiResponse({
    status: 200,
    description: 'Regresa true si el departamento ha sido eliminado',
    isArray: false,
    type: Boolean,
  })
  @Delete('/:id')
  deleteDepartamentoById(@Param('id') id: number): Promise<boolean> {
    return this.departamentosService.deleteDepartamento(id);
  }
}
