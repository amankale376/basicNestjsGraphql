import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QueryDto {
  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  page?: number;
}
