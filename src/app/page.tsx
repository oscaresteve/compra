import ItemsList from "@/components/items-list";
import { loadAppData } from "./loader";
import { clerkClient } from "@clerk/nextjs/server";

export default async function Home() {
  const { items } = await loadAppData();
  const clerkIds = [...new Set(items.map((i) => i.clerkId).filter(Boolean))];
  const client = await clerkClient();
  const users = await Promise.all(clerkIds.map((id) => client.users.getUser(id)));
  const avatarMap = Object.fromEntries(
    users.map((u) => [u.id, { imageUrl: u.imageUrl, name: u.firstName ?? u.username ?? "User" }]),
  );

  return (
    <main className="max-w-xl mx-auto p-4">
      <ItemsList items={items} avatarMap={avatarMap} />
    </main>
  );
}
