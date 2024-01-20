import { Post } from "@prisma/client";
import { z } from "zod";
import { prismaClient } from "../prisma-client";

export async function updatePost({ id, title, content, published }: Partial<Post>) {
  const updatePostSchema = z.object({
    id: z.number().int(),
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional()
  });

  const validatedPost = updatePostSchema.parse({
    id: parseInt(id as any),
    title,
    content,
    published
  });

  return await prismaClient.post.update({
    data: validatedPost,
    where: {
      id: validatedPost.id,
    },
  });
}
