import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers(@Res() res: Response) {
    const userData = await this.userService.getAllUsers();
    return res.send({ status: 'ok', data: userData });
  }

  @Get('/:id')
  async getUserByID(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const userData = await this.userService.getUser(id);
    return res.send({ status: 'ok', data: userData });
  }

  @Post('/')
  //   @UseInterceptors(FileInterceptor('')) --- get POST in form-data type
  async createUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.createUser(req.body);
    return res.send({ status: 'ok' });
  }

  @Put('/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    const { email, username, firstName, lastName, state, role } = body;

    await this.userService.updateUserData(id, {
      email,
      username,
      firstName,
      lastName,
      state,
      role,
    });

    return res.send({ status: 'ok' });
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id);

    return res.send({ status: 'ok' });
  }
}
