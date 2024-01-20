import { User } from "@prisma/client";
import { prismaClient } from "../prisma-client";

export async function listUsers(): Promise<User[]> {
  return await prismaClient.user.findMany();
}