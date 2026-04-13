import { Body, Controller, Post } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { url } from 'inspector';
import { CreateMonitorDto } from './dto/create-monitor.dto';

@Controller('monitor')
export class MonitorController {
    constructor(
        private readonly monitorService: MonitorService,
    ) { }

    @Post()
    async createMonitor(@Body() body: CreateMonitorDto) {
        return this.monitorService.createMonitor(body);
    }

    @Post('test-ping')
    async testPing(@Body() body: { monitorId: string; url: string }) {
        return this.monitorService.executePing(body.monitorId, body.url);
    }
}
