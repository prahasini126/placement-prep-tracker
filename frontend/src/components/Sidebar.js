import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const { pathname } = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      pathname === path
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm p-5">

      <nav className="space-y-3 mt-10">

        <Link to="/" className={linkClass("/")}>
          Dashboard
        </Link>

        <Link to="/add" className={linkClass("/add")}>
          Add Progress
        </Link>

        <Link to="/weak" className={linkClass("/weak")}>
          Weak Areas
        </Link>

      </nav>
    </div>
  );
}
