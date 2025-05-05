// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  

  @Post()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
