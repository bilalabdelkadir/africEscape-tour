import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWishlistDto: CreateWishlistDto, userId) {
    return await this.prisma.wishlist.create({
      data: {
        tourId: createWishlistDto.tourId,
        userId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.wishlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        tour: true,
        user: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.wishlist.delete({
      where: {
        id: id,
      },
    });
  }
}
