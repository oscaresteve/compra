"use client";
import { createItemAction, deleteItemAction } from "@/app/actions";
import { ItemView } from "@/lib/types";
import { CircleDashed, CircleCheckBig, Plus, X } from "lucide-react";
import Image from "next/image";

type ItemsListProps = {
  items: ItemView[];
  avatarMap: {
    [k: string]: {
      imageUrl: string;
      name: string;
    };
  };
};

export default function ItemsList({ items, avatarMap }: ItemsListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => {
        const isChecked = item.checked;
        const Icon = isChecked ? CircleCheckBig : CircleDashed;
        const user = avatarMap[item.clerkId];

        return (
          <li key={item.id} className="flex gap-6 items-center py-1 px-3 group">
            <Icon className={`size-5 ${isChecked && "opacity-75"}`} />
            <p className={`text-base ${isChecked && "opacity-75 line-through"}`}>{item.text}</p>
            <div className="flex gap-4 ml-auto items-center">
              {user && (
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                  title={user.name}
                />
              )}
              <form action={deleteItemAction} className="items-center flex">
                <input type="hidden" name="itemId" value={item.id} />
                <button type="submit" className="opacity-40 active:opacity-100 transition-opacity cursor-pointer">
                  <X className="size-4" />
                </button>
              </form>
            </div>
          </li>
        );
      })}

      <li key="add-button">
        <form action={createItemAction} className="flex gap-6 items-center cursor-pointer py-1 px-3">
          <Plus className="size-5" />
          <input
            type="text"
            placeholder="Añadir item"
            name="text"
            className="focus-visible:outline-0 w-full"
            onBlur={(e) => {
              const value = e.currentTarget.value.trim();
              if (value) e.currentTarget.form?.requestSubmit();
            }}
          />
        </form>
      </li>
    </ul>
  );
}
