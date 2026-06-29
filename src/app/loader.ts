"use server";

import { prisma } from "@/lib/prisma";
import { ItemView } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function loadAppData(): Promise<{ items: ItemView[] }> {
  const user = await auth.protect();

  if (!user) return { items: [] };

  try {
    const items = await prisma.item.findMany({
      orderBy: {
        checked: "asc",
      },
    });

    return {
      items: items,
    };
  } catch (error) {
    console.error(error);
    return {
      items: [],
    };
  }
}
