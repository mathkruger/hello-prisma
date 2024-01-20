import { User } from "@prisma/client";
import { prismaClient } from "../prisma-client";
import { z } from "zod";

export async function getUser(userId: any): Promise<User | null> {
  const idSchema = z.number().int();
  const validatedId = idSchema.parse(parseInt(userId));

  return await prismaClient.user.findUnique({
    where: {
      id: validatedId
    },
    include: {
      posts: true
    }
  });
}