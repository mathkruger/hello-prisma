import { Post } from "@prisma/client";
import { z } from "zod";
import { prismaClient } from "../prisma-client";

export async function createPost(post: Post) {
  const createPostSchema = z.object({
    title: z.string(),
    content: z.string().nullable(),
    published: z.boolean(),
    authorId: z.number().int()
  })

  const validatedPost = createPostSchema.parse(post)

  return await prismaClient.post.create({
    data: validatedPost
  });
}