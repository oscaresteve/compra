import { readAllItems } from "@/lib/queries";
import { ItemView } from "@/lib/types";

export async function loadAppData(): Promise<{ items: ItemView[] }> {
  const items = await readAllItems();
  if (!items) return { items: [] };
  return { items };
}
