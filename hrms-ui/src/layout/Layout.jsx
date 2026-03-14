import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"

function Layout() {

  const location = useLocation();

  const navItem = (path, label) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        className={`px-4 py-2 rounded-md text-sm font-medium transition
        ${active
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}

      <header className="bg-white border-b h-[70px]">

        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <img src={logo} alt="" className="h-12 w-35 object-contain"/>

          <nav className="flex gap-2">

            {navItem("/", "Employees")}
            {navItem("/attendance", "Attendance")}

          </nav>

        </div>

      </header>

      {/* Page Content */}

      <main className="max-w-6xl mx-auto p-6">

        <Outlet />

      </main>

    </div>
  );
}

export default Layout;