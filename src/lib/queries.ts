import { prisma } from "@/lib/prisma";

export async function readAllItems() {
  try {
    const result = await prisma.item.findMany();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
