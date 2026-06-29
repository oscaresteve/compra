import { UserButton } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="max-w-xl mx-auto p-4 flex justify-between">
      <div className="flex items-center gap-2">
        <ShoppingCart className="size-4 text-neutral-400" />
        <h1 className="text-base font-semibold text-neutral-100">Lista de la compra</h1>
      </div>
      <UserButton />
    </header>
  );
}
