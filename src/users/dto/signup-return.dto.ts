import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
@InputType()
export class SignupReturnDto {
  @Field()
  @IsString()
  username: string;
  @Field()
  @IsString()
  @IsEmail()
  email: string;
  @Field()
  @IsString()
  message: string;
}
