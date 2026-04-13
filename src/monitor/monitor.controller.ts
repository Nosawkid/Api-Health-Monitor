import { Body, Controller, Post } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { url } from 'inspector';

@Controller('monitor')
export class MonitorController {
    constructor(
        private readonly monitorService: MonitorService,
    ) { }

    @Post()
    async createMonitor(@Body() body: { name: string; url: string; intervalMinutes?: number }) {
        return this.monitorService.createMonitor(body);
    }

    @Post('test-ping')
    async testPing(@Body() body: { monitorId: string; url: string }) {
        // Now we use the real ID provided in the request body
        return this.monitorService.executePing(body.monitorId, body.url);
    }
}
