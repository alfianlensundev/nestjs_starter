import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getRoot(): any {
        return {
            app_name: "Auth Service",
            build_number: process.env.BUILD_NUMBER
        };
    }
}
