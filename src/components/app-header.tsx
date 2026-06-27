import { UserButton } from "@clerk/nextjs";

export default function AppHeader() {
  return (
    <header className="flex h-20 relative items-center justify-center">
      <h1 className="text-xl font-semibold">Lista de la compra</h1>
      <div className="absolute right-4">
        <UserButton />
      </div>
    </header>
  );
}
