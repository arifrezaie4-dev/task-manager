import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'arif@gmail.com',
  })
  email!: string;

  @ApiProperty({
    example: 'Password123!',
  })
  password!: string;
}