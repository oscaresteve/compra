import { prisma } from "@/lib/prisma";

export async function readAllItems() {
  try {
    const result = await prisma.item.findMany({
      orderBy: {
        updatedAt: "asc",
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
