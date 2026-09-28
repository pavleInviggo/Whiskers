import { Controller, Get } from '@nestjs/common';
import {hostname} from 'node:os';

@Controller('whoami')
export class WhoamiController {
    
    @Get()
    whoami() {
        return {hostname: hostname()};   
    }

}