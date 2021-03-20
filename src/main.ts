import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.use(helmet());

	const config = new DocumentBuilder()
		.setTitle('Integração Pipedrive-Bling')
		.setDescription(
			'Backend criado para fazer integração entre o Pipedrive e o Bling utilizando suas respectivas APIs.',
		)
		.setVersion('1.0')
		.addTag('LinkApi')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
