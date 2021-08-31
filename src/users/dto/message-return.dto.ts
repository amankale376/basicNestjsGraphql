import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
@InputType()
export class MessageReturnDto {
  @Field()
  @IsString()
  message: string;
}
