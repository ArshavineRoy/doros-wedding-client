import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  return (
    <div className="h-20 w-full z-50 flex justify-between py-4 items-center bg-black px-28">
      <Link to="checklist">
        <Logo />
      </Link>
      <nav>
        <ul className="flex justify-between gap-4 text-white">
          <NavLink to="dashboard">Planning Tool</NavLink>
          <NavLink to="vendors">Vendors</NavLink>
        </ul>
      </nav>

      {/* <div>
        <button>
          <NavLink>Login</NavLink>
        </button>
        <button>
          <NavLink>Sign Up</NavLink>
        </button>
      </div> */}
    </div>
  );
}

export default Navbar;
