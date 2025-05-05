// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { user_id: id } });
  }
  
  create(userData: Partial<User>): Promise<User> {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepo.update(id, userData);
    const updated = await this.findOne(id);
    if (!updated) {
    throw new Error(`User with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
