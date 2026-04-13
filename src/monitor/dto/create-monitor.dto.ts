// src/monitor/dto/create-monitor.dto.ts
import { IsString, IsNotEmpty, IsUrl, IsInt, Min, IsOptional } from 'class-validator';

export class CreateMonitorDto {
    @IsString()
    @IsNotEmpty({ message: 'Monitor name cannot be empty' })
    name!: string;

    // The bouncer: strictly checks if the string is a valid web address
    @IsUrl(
        { require_tld: true, require_protocol: true },
        { message: 'You must provide a valid URL with http:// or https://' }
    )
    url!: string;

    // Optional, but if provided, it MUST be an integer of at least 1
    @IsOptional()
    @IsInt()
    @Min(1, { message: 'Interval must be at least 1 minute' })
    intervalMinutes?: number;
}