"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function createItemAction(formData: FormData) {
  const { userId } = await auth.protect();
  const text = formData.get("text") as string;

  try {
    await prisma.item.create({
      data: {
        clerkId: userId,
        text,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
