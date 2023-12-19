import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service class for managing tags.
 */
@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new tag with the given name.
   * @param name - The name of the tag.
   * @returns A promise that resolves to the created tag.
   */
  async createTag(name: string) {
    return await this.prisma.tags.create({
      data: {
        name,
      },
    });
  }

  /**
   * Creates new tags with the given names.
   * @param names - The names of the tags.
   * @returns A promise that resolves to the created tags.
   */
  async createTags(names: string[]) {
    return await this.prisma.tags.createMany({
      data: names.map((name) => ({ name })),
      skipDuplicates: true,
    });
  }

  /**
   * Retrieves all tags.
   * @returns A promise that resolves to an array of tags.
   */
  async getTags() {
    return await this.prisma.tags.findMany();
  }

  /**
   * Retrieves a tag by its ID.
   * @param id - The ID of the tag.
   * @returns A promise that resolves to the found tag, or null if not found.
   */
  async getTagById(id: string) {
    return await this.prisma.tags.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Retrieves a tag by its name.
   * @param name - The name of the tag.
   * @returns A promise that resolves to the found tag, or null if not found.
   */
  async getTagByName(name: string) {
    return await this.prisma.tags.findUnique({
      where: {
        name,
      },
    });
  }

  /**
   * Retrieves tags by their names.
   * @param names - The names of the tags.
   * @returns A promise that resolves to the found tags, or null if not found.
   */
  async getTagsByName(names: string[]) {
    return await this.prisma.tags.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  }

  /**
   * Deletes a tag by its ID.
   * @param id - The ID of the tag.
   * @returns A promise that resolves to the deleted tag, or null if not found.
   */
  async deleteTag(id: string) {
    return await this.prisma.tags.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Updates a tag with the given ID and name.
   * @param id - The ID of the tag to update.
   * @param name - The new name of the tag.
   * @returns A promise that resolves to the updated tag, or null if not found.
   */
  async updateTag(id: string, name: string) {
    return await this.prisma.tags.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
}
