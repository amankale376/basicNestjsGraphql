import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';
import { MessageReturnDto } from './dto/message-return.dto';
import { QueryDto } from './dto/query.dto';
import { SignupDto } from './dto/signup.dto';
import { UserReturnDto } from './dto/user.return.dto';
import { MessageBack, User, UserBack } from './user.entity';
import { UsersService } from './users.service';
import { Token } from './token.decorator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => User || MessageBack || UserBack)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => MessageBack)
  Login(@Args('loginInput') loginInput: LoginDto): Promise<MessageReturnDto> {
    return this.userService.login(loginInput);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => User)
  SignUp(@Args('SignupInput') input: SignupDto): Promise<User> {
    return this.userService.signup(input);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => MessageBack)
  DeleteUser(@Token() token): Promise<MessageReturnDto> {
    console.log(token);
    return this.userService.deleteUser(token);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [UserBack])
  ListUsers(
    @Args('input') input: QueryDto,
    @Token() token,
  ): Promise<UserReturnDto[]> {
    return this.userService.listUsers(input, token);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => UserBack)
  GetUser(@Token() token): Promise<UserReturnDto> {
    return this.userService.getUser(token);
  }
}
