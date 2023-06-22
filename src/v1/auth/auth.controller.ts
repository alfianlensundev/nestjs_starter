import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizeDto } from './auth.dto';

@ApiTags('Auth')
@Controller("v1/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('authorize')
    @HttpCode(HttpStatus.OK)
    async authorize(@Body() authorizeDto: AuthorizeDto): Promise<any> {
        const {error = null,error_code = 0, messages, ...data}: any = await this.authService.authorize(authorizeDto.username, authorizeDto.password, authorizeDto.datafield)
        if (error) throw new UnauthorizedException({
            error_code,
            message: messages
        })
        return {
            code: 200,
            status: 'OK',
            data
        }
    }

    @Get('roles')
    @HttpCode(HttpStatus.OK)
    async getRoles(): Promise<any> {
        return []
    }
}
