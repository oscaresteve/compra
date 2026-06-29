"use client";
import { checkItemAction, createItemAction, deleteItemAction } from "@/app/actions";
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
    <ul className="flex flex-col divide-y divide-neutral-800">
      {items.map((item) => {
        const isChecked = item.checked;
        const Icon = isChecked ? CircleCheckBig : CircleDashed;
        const user = avatarMap[item.clerkId];

        return (
          <li key={item.id} className="flex gap-4 items-center py-3 px-4">
            <form action={checkItemAction.bind(null, isChecked)} className="flex items-center">
              <input type="hidden" name="itemId" value={item.id} />
              <button type="submit" className="p-1 -m-1 active:scale-90 transition-transform cursor-pointer">
                <Icon className={`size-5 ${isChecked ? "text-neutral-600" : "text-neutral-100"}`} />
              </button>
            </form>

            <p
              className={`text-base truncate flex-1 ${isChecked ? "text-neutral-600 line-through" : "text-neutral-100"}`}
            >
              {item.text}
            </p>

            <div className="flex gap-3 items-center">
              {user && (
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  width={22}
                  height={22}
                  className="rounded-full opacity-60"
                  title={user.name}
                />
              )}
              <form action={deleteItemAction} className="flex items-center">
                <input type="hidden" name="itemId" value={item.id} />
                <button
                  type="submit"
                  className="p-1 -m-1 text-neutral-600 active:text-red-400 transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </form>
            </div>
          </li>
        );
      })}

      <li>
        <form action={createItemAction} className="flex gap-4 items-center py-3 px-4">
          <Plus className="size-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="Añadir item..."
            name="text"
            className="flex-1 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none bg-transparent"
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
