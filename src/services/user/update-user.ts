import { User } from "@prisma/client";
import { z } from "zod";
import { prismaClient } from "../prisma-client";

export async function updateUser({ id, name }: Partial<User>) {
  const updateUserSchema = z.object({
    id: z.number().int(),
    name: z.string(),
  });

  const { id: validatedId, name: validatedName } = updateUserSchema.parse({
    id: parseInt(id as any),
    name: name,
  });

  return await prismaClient.user.update({
    data: {
      name: validatedName,
    },
    where: {
      id: validatedId,
    },
  });
}
