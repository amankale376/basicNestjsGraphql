import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewUserInput {
  @Field()
  name: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
