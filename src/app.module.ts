import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonitorModule } from './monitor/monitor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "add your password",
      database: "health_monitor_db",
      autoLoadEntities: true,
      synchronize: true
    }),
    MonitorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
