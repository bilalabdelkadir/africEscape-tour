import { RefreshTokens, Tourist } from '@prisma/client';

// TODO: fix this
export class CreateUserOutputDto {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  Tourist: Tourist;
}
