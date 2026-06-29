"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createItemAction(formData: FormData) {
  const user = await auth.protect();
  const text = formData.get("text") as string;
  const clerkId = user.userId;

  if (!user) return;

  try {
    await prisma.item.create({
      data: {
        clerkId,
        text,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItemAction(formData: FormData) {
  const user = await auth.protect();
  const itemId = formData.get("itemId") as string;

  console.log(itemId)

  if (!user) return;

  try {
    await prisma.item.delete({
      where: {
        id: itemId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
