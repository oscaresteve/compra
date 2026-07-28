"use client";
import { checkItemAction, createItemAction, deleteItemAction } from "@/app/actions";
import { ItemView } from "@/lib/types";
import { CircleDashed, CircleCheckBig, Loader2, Plus, X } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { useRef } from "react";

type ItemsListProps = {
  items: ItemView[];
  avatarMap: {
    [k: string]: {
      imageUrl: string;
      name: string;
    };
  };
};

function CheckButton({ isChecked }: { isChecked: boolean }) {
  const { pending } = useFormStatus();
  const Icon = isChecked ? CircleCheckBig : CircleDashed;

  return (
    <button
      type="submit"
      disabled={pending}
      className="p-1 -m-1 active:scale-90 transition-transform cursor-pointer disabled:cursor-not-allowed"
    >
      {pending ? (
        <Loader2 className="size-5 text-neutral-400 animate-spin" />
      ) : (
        <Icon className={`size-5 ${isChecked ? "text-neutral-600" : "text-neutral-100"}`} />
      )}
    </button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="p-1 -m-1 text-neutral-600 active:text-red-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
    </button>
  );
}

function CreateItemInput() {
  const { pending } = useFormStatus();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Plus className={`size-5 shrink-0 ${pending ? "text-neutral-600 animate-pulse" : "text-neutral-400"}`} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Añadir item..."
        name="text"
        disabled={pending}
        className="flex-1 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none bg-transparent disabled:opacity-50"
        onBlur={(e) => {
          const value = e.currentTarget.value.trim();
          if (value) e.currentTarget.form?.requestSubmit();
        }}
      />
      {pending && <Loader2 className="size-4 text-neutral-600 animate-spin shrink-0" />}
    </>
  );
}

export default function ItemsList({ items, avatarMap }: ItemsListProps) {
  return (
    <ul className="flex flex-col divide-y divide-neutral-800">
      {items.map((item) => {
        const isChecked = item.checked;
        const user = avatarMap[item.clerkId];

        return (
          <li key={item.id} className="flex gap-4 items-center py-3 px-4">
            <form action={checkItemAction.bind(null, isChecked)} className="flex items-center">
              <input type="hidden" name="itemId" value={item.id} />
              <CheckButton isChecked={isChecked} />
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
                <DeleteButton />
              </form>
            </div>
          </li>
        );
      })}

      <li>
        <form action={createItemAction} className="flex gap-4 items-center py-3 px-4">
          <CreateItemInput />
        </form>
      </li>
    </ul>
  );
}
