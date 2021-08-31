import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;
  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;
}

@ObjectType()
export class MessageBack {
  @Field()
  message: string;
}

@ObjectType()
export class UserBack {
  @Field()
  name: string;
  @Field()
  username: string;
  @Field()
  email: string;
}