import { timeStamp } from "console";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Monitor {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    url!: string

    @Column({ default: 5 })
    intervalMinutes!: number

    @Column({ default: true })
    isActive!: boolean

    @CreateDateColumn()
    createdAt!: Date


    @Column({ type: "timestamp", nullable: true })
    lastPingedAt!: Date

}