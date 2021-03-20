import { XmlService } from './xml.service';
import { Module } from '@nestjs/common';

@Module({
	providers: [XmlService],
	exports: [XmlService],
})
export class XmlModule {}
