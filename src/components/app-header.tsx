"use client";

import { deleteAllItemsAction } from "@/app/actions";
import { UserButton } from "@clerk/nextjs";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AppHeader() {
  const [pending, setPending] = useState(false);

  async function handleDeleteAll() {
    if (!confirm("¿Borrar todos los items de la lista?")) return;

    setPending(true);
    try {
      await deleteAllItemsAction();
    } finally {
      setPending(false);
    }
  }

  return (
    <header className="max-w-xl mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <ShoppingCart className="size-5 text-neutral-400 mr-1" />
        <h1 className="text-xl font-semibold text-neutral-100">Lista de la compra</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleDeleteAll}
          disabled={pending}
          title="Borrar todo"
          className="p-1 -m-1 text-neutral-500 active:text-red-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {pending ? <Loader2 className="size-5 animate-spin" /> : <Trash2 className="size-5" />}
        </button>
        <UserButton />
      </div>
    </header>
  );
}
