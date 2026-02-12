import UserMenu from "./UserMenu";

export default function Topbar() {
  return (
    <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between px-8 relative z-50">

      <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
        PrepSense
      </h1>

      <UserMenu />

    </div>
  );
}
