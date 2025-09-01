import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';

type AuthInput = { username: string; password: string };
type SignInData = { id: string; username: string };
type AuthResult = { accessToken: string; id: string; username: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.id,
      username: user.username,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, username: user.username, id: user.id };
  }

  async createUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.createUser(input);

    if (!user) {
      throw new InternalServerErrorException();
    }

    return {
      id: user._id,
      username: user.username,
    };
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByUsername(input.username);

    if (user && bcrypt.compare(input.password, user.password)) {
      return {
        id: user._id,
        username: user.username,
      };
    }
    return null;
  }
}
