import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './v1/auth/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './v1/auth/auth.guard';

@Module({
    imports: [
        AuthModule, 
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    }],
})
export class AppModule {}
