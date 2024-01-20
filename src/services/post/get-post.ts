import { prismaClient } from "../prisma-client";
import { z } from "zod";

export async function getPost(postId: any) {
  const idSchema = z.number().int();
  const validatedId = idSchema.parse(parseInt(postId));

  return await prismaClient.post.findUnique({
    where: {
      id: validatedId
    },
    include: {
      author: true
    }
  })
}