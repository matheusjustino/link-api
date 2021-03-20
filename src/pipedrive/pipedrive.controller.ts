import {
	Controller,
	Get,
	Post,
	Body,
	HttpStatus,
	Res,
	Param,
	Query,
} from '@nestjs/common';
import {
	ApiBody,
	ApiResponse,
	ApiParam,
	ApiTags,
	ApiOperation,
	ApiOkResponse,
} from '@nestjs/swagger';

// Services
import { PipedriveService } from './pipedrive.service';

// Schemas
import { Deal } from './../database/schemas/deal.schema';

// Dtos
import { PipedriveResponseDto } from '../dtos/pipedrive-response.dto';
import { DealDto } from '../dtos/deal.dto';

@ApiTags('Pipedrive')
@Controller('pipedrive')
export class PipedriveController {
	constructor(private readonly pipedriveService: PipedriveService) {}

	@Post('deals')
	@ApiBody({ type: DealDto })
	@ApiOkResponse({ type: PipedriveResponseDto })
	@ApiOperation({
		description: 'Cria um novo Deal no Pipedrive com o status [Won].',
	})
	public addDeal(@Res() res, @Body() body: DealDto) {
		return this.pipedriveService.addDeal(body).subscribe(
			(result) => res.status(HttpStatus.OK).json(result),
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('deals')
	@ApiOkResponse({ type: [PipedriveResponseDto] })
	@ApiOperation({ description: 'Busca os Deals existentes.' })
	public getAllDeals(@Res() res, @Query() query) {
		return this.pipedriveService.getAllDeals(query).subscribe(
			(result) => {
				res.status(HttpStatus.OK).json(result);
				return result;
			},
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('deals/:dealId')
	@ApiParam({ name: 'dealId', type: 'string' })
	@ApiOkResponse({ type: PipedriveResponseDto })
	@ApiOperation({ description: 'Busca um Deal específico.' })
	public getDealDetails(@Res() res, @Param('dealId') dealId: string) {
		return this.pipedriveService.getDealDetails(dealId).subscribe(
			(result) => res.status(HttpStatus.OK).json(result),
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}
}
