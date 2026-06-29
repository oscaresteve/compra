"use client";
import createItemAction from "@/app/actions";
import { ItemView } from "@/lib/types";
import { CircleDashed, CircleCheckBig, Plus } from "lucide-react";
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
          <li key={item.id} className="flex gap-6 items-center">
            <Icon className={`size-5 ${isChecked && "opacity-75"}`} />
            <p className={`text-base ${isChecked && "opacity-75 line-through"}`}>{item.text}</p>
            {user && (
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={24}
                height={24}
                className="rounded-full ml-auto"
                title={user.name}
              />
            )}
          </li>
        );
      })}

      <li key="add-button">
        <form action={createItemAction} className="flex gap-6 items-center cursor-pointer">
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
