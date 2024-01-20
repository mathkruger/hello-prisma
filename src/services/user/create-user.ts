import { User } from "@prisma/client";
import { z } from "zod";
import { prismaClient } from "../prisma-client";

export async function createUser(user: User) {
  const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string()
  })

  const validatedUser = createUserSchema.parse(user)

  return await prismaClient.user.create({
    data: validatedUser
  });
}