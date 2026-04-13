import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monitor } from '../entities/monitor.entity';
import { MonitorService } from '../monitor.service';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);

    constructor(
        @InjectRepository(Monitor)
        private readonly monitorRepository: Repository<Monitor>,
        private readonly monitorService: MonitorService,
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        this.logger.debug('Running health check cycle...');

        const activeMonitors = await this.monitorRepository.find({
            where: { isActive: true },
        });

        const now = new Date();

        for (const monitor of activeMonitors) {
            let shouldPing = false;

            if (!monitor.lastPingedAt) {
                shouldPing = true;
            } else {
                const diffMs = now.getTime() - monitor.lastPingedAt.getTime();
                const diffMinutes = Math.floor(diffMs / 60000);

                if (diffMinutes >= monitor.intervalMinutes) {
                    shouldPing = true;
                }
            }

            if (shouldPing) {
                this.logger.log(`Triggering scheduled ping for: ${monitor.name}`);
                this.monitorService.executePing(monitor.id, monitor.url).catch((err) => {
                    this.logger.error(`Scheduled ping failed for ${monitor.name}`, err);
                });
            }
        }
    }
}