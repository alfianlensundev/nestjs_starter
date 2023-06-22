import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthorizeDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Username from paripurna',
        minimum: 1
    })
    username: string;
    
    @IsNotEmpty()
    @ApiProperty({
        description: 'User password from paripurna',
        minimum: 1
    })
    password: string;

    
    @ApiProperty({
        description: 'Field to return, separate by comma',
    })
    datafield: string;
}

export class AuthorizeResponseDto {
    
}

export class ServiceErrorDto {
    error: boolean;
    messages: Array<string>;
    error_code: number;
}