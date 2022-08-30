import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async paginate(page = 1): Promise<any> {
    const take = 15;
    const [users, total] = await this.userRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data: users,
      mata: {
        total: total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }
  async update(id: number, data): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async findOne(condition): Promise<User> {
    return this.userRepository.findOneBy(condition);
  }
  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
