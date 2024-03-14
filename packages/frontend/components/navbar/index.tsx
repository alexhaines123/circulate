import Link from "next/link";
import { SearchProductNavForm } from "../forms/products/search";

function NavBar() {
  return (
    <div className="navbar bg-base-100 flex-wrap">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost">
          Circulate
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        <SearchProductNavForm />
        <Link href="/products/create">
          <button className="btn btn-primary">Sell an item</button>
        </Link>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
