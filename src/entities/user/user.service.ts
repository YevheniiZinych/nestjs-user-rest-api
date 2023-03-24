import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  availableFields = [
    'email',
    'username',
    'firstName',
    'lastName',
    'state',
    'role',
  ];

  private filterFields(body: { [k: string]: any }) {
    const filteredBody: { [k: string]: any } = {};

    Object.keys(body).filter((k) => {
      if (this.availableFields.includes(k)) {
        filteredBody[k] = body[k];
      }
    });

    return filteredBody;
  }

  //get all users
  public async getAllUsers() {
    return await this.userRepository.find();
  }

  // register new user
  public async createUser(userData: any) {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  // get user data by id
  public async getUser(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  // update all or one user rows
  public async updateUserData(id: number, body: UpdateUserDto) {
    return await this.userRepository.update({ id }, this.filterFields(body));
  }

  //dele user by id
  public async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
}
