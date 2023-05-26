import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interface/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  /* 
  // Forma 1 de obtener el usuario por la request
  @Get('private')
  @UseGuards(AuthGuard())
  testPrivate(@Req() request: Express.Request) {
    console.log({ request });
    return { msg: 'Test' };
  } */

  //Forma 2 de obtener el usuario por decorador personalizado
  @Get('private')
  @UseGuards(AuthGuard())
  testPrivate(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return { msg: 'Test', user, rawHeaders };
  }

  // forma 3 usando un guard personalizado
  @Get('private2')
  // @SetMetadata('roles', ['admin', 'super-user']) // esto se usa si no queremos usar el guard personalizado
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testPrivate2(@GetUser() user: User) {
    return { msg: 'OK', user };
  }

  // forma final usando un decorador que unifica todo lo demás
  @Get('private3')
  @Auth(ValidRoles.admin)
  testPrivate3(@GetUser() user: User) {
    return { msg: 'OK', user };
  }
}
