import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHealth(): string {
        return 'UAC Backend is up and running';
    }
}
