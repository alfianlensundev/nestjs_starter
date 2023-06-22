import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ServiceErrorDto } from './auth.dto';
import {auth_users} from '@prisma/client'
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async authorize(username: string, password: string, datafield: string = ""): Promise<ServiceErrorDto|auth_users> {
        
        const user = await this.prisma.auth_users.findFirst({
            where: {
                username,
                flag_active: 1
            }
        })
        if (user == null) return {
            error: true,
            messages: [
                "User tidak di temukan"
            ],
            error_code: 1
        }
        const generateBcryptPhpToNodejs = user.password.replace('$2y$', '$2b$')
        if (!bcrypt.compare(password, generateBcryptPhpToNodejs))  return {
            error: true,
            messages: [
                "Kata sandi tidak sesuai"
            ],
            error_code: 2
        }
        
        return {
            error: true,
            messages: [
                "Kata sandi tidak sesuai"
            ],
            error_code: 1
        }
    }
}
