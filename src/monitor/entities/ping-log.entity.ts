import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Monitor } from './monitor.entity';

@Entity()
export class PingLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Monitor, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'monitorId' })
    monitor: Monitor;

    @Column()
    monitorId: string;

    @Column()
    statusCode: number; // e.g., 200 (Success), 500 (Server Error)

    @Column()
    latencyMs: number; // How fast was the response?

    @CreateDateColumn()
    createdAt: Date;
}