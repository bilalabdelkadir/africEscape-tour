import { RefreshTokens, Tourist } from '@prisma/client';

export class CreateUserOutputDto {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  Tourist: Tourist;
}
