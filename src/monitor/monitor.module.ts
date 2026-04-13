import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitor } from './entities/monitor.entity';
import { PingLog } from './entities/ping-log.entity';
import { HttpModule } from '@nestjs/axios';
import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Monitor, PingLog]),
    HttpModule
  ],
  providers: [
    MonitorService,
    SchedulerService
  ],
  controllers: [MonitorController]
})
export class MonitorModule { }
