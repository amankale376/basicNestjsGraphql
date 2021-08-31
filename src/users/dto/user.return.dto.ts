import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
InputType()
export class UserReturnDto {
  @Field()
  @IsString()
  name: string;
  @Field()
  @IsString()
  username: string;
  @Field()
  @IsString()
  email: string;
}
