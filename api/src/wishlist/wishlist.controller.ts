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
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { AccountType } from '@prisma/client';
import { CheckAccountType } from 'src/auth/decorators/AccountTypeChecker';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @CheckAccountType(AccountType.TOURIST)
  create(@Body() createWishlistDto: CreateWishlistDto, @Req() req: Request) {
    return this.wishlistService.create(
      createWishlistDto,
      req['user'].profileId,
    );
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @CheckAccountType(AccountType.TOURIST)
  findAll(@Req() req: Request) {
    return this.wishlistService.findAll(req['user'].profileId);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @CheckAccountType(AccountType.TOURIST)
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(id);
  }
}
