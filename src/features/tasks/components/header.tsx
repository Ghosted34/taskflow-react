import { Notifications } from "../../notifications/components/notification";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-xl font-semibold">My App</h1>

      <Notifications />
    </header>
  );
}
