import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitor } from './entities/monitor.entity';
import { Repository } from 'typeorm';
import { PingLog } from './entities/ping-log.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MonitorService {

    private readonly logger = new Logger(MonitorService.name)

    constructor(
        @InjectRepository(Monitor)
        private monitorRepository: Repository<Monitor>,
        @InjectRepository(PingLog)
        private logRepository: Repository<PingLog>,
        private readonly httpService: HttpService
    ) { }

    async createMonitor(data: { name: string; url: string; intervalMinutes?: number }) {
        const newMonitor = this.monitorRepository.create({
            name: data.name,
            url: data.url,
            intervalMinutes: data.intervalMinutes || 5,
        });
        return await this.monitorRepository.save(newMonitor);
    }


    async executePing(monitorId: string, url: string) {
        const startTime = Date.now()
        let statusCode = 500

        try {
            const response = await firstValueFrom(this.httpService.get(url, { timeout: 5000 }))
            statusCode = response.status
            this.logger.log(`Ping successful: ${url} (${statusCode})`);
        } catch (error: any) {
            statusCode = error.response?.status || 500;
            this.logger.error(`Ping failed: ${url} (${statusCode})`);
        }
        const latencyMs = Date.now() - startTime
        const log = this.logRepository.create({
            monitorId,
            statusCode,
            latencyMs
        })

        await this.logRepository.save(log)
        await this.monitorRepository.update(monitorId, { lastPingedAt: new Date() });
        return log
    }
}
