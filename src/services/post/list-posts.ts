import { z } from "zod";
import { prismaClient } from "../prisma-client";

export async function listPosts(authorId?: any) {
  if (authorId) {
    const authorIdSchema = z.number().int();
    const validatedAuthor = authorIdSchema.parse(parseInt(authorId))

    return await prismaClient.post.findMany({
      where: {
        authorId: validatedAuthor
      }
    })
  }

  return await prismaClient.post.findMany()
}