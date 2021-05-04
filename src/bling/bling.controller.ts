import { Controller, Get, Post, HttpStatus, Res } from '@nestjs/common';
import {
	ApiBody,
	ApiResponse,
	ApiParam,
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiTags,
	ApiOperation,
} from '@nestjs/swagger';

// Services
import { BlingService } from './bling.service';

// Dtos
import { BlingOrderSuccessDto } from '../dtos/bling-order-success.dto';
import { BlingOrderError } from './../dtos/bling-order-error.dto';
import { BlingOrderSaveDatabase } from '../dtos/bling-order-save-database.dto';
import { ReportsDto } from '../dtos/reports.dto';

@ApiTags('Bling')
@Controller('bling')
export class BlingController {
	constructor(private readonly blingService: BlingService) {}

	@Post('save-order')
	@ApiOkResponse({ type: [BlingOrderSuccessDto] })
	@ApiNotFoundResponse({ type: [BlingOrderError] })
	@ApiOperation({
		description:
			'Salva os Deals no Bling como um [Pedido de Venda]. Caso o pedido já esteja registrado no Bling, uma mensagem de erro é retornada.',
	})
	public saveOrder(@Res() res) {
		return this.blingService.integration().subscribe(
			(result) => {
				return res.status(HttpStatus.OK).json(result);
			},
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Post('save-on-database')
	@ApiResponse({ type: BlingOrderSaveDatabase })
	@ApiOperation({
		description:
			'Salva os pedidos de venda no banco de dados. A tabela [opportunities] no MongoDB Atlas recebe um registro diário com todas as vendas do dia.',
	})
	public saveOnDatabase(@Res() res) {
		return this.blingService.saveOnDatabase().subscribe(
			(result) => {
				console.log(result);
				return res.status(HttpStatus.OK).json(result);
			},
			(error) => {
				console.log(error);
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('reports')
	@ApiResponse({ type: [ReportsDto] })
	@ApiOperation({
		description: 'Busca no MongoDB Atlas todos os dados de vendas.',
	})
	public getFromDatabase(@Res() res) {
		return this.blingService.reports().subscribe(
			(result) => {
				console.log(result);
				return res.status(HttpStatus.OK).json(result);
			},
			(error) => {
				console.log(error);
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}
}
