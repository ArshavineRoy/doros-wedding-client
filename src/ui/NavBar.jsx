import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "./Actions"; // Import your action
import Logo from "./Logo";
const NavBar = () => {
  const menuOpen = useSelector((state) => state.menuOpen);
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(toggleMenu()); // Dispatch the action to toggle the menu state
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8 bg-black h-20" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 mb-2">
            {/* Your Logo component */}
            <Logo/>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={handleToggleMenu} // Call the handleToggleMenu function when the button is clicked
            id="openMenuButton"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
       
        <div className={`lg:flex lg:gap-x-12 ${menuOpen ? 'hidden' : 'block'}`}>
          <a href="/" className="text-base font leading-6 text-white hover:text-pink-900">Planning Tools</a>
          <a href="/E-vite" className="text-base font leading-6 text-white hover:text-pink-900">E-vite</a>
          <a href="/guestlist" className="text-base font leading-6 text-white hover:text-pink-900">Guest-List</a>
          <a href="/registry" className="text-base font leading-6 text-white hover:text-pink-900">Registry</a>
          <a href="/vendors" className="text-base font leading-6 text-white hover:text-pink-900">Vendors</a>
          <button className="bg-pink-950 text-white text-base font-semibold leading-6 p-2 rounded hover-bg-pink-900">
            <a href="/login" className="text-white">Login</a>
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={menuOpen ? "lg:hidden block" : "hidden"} role="dialog" aria-modal="true" id="mobile-menu">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Easel Emporium</span>
              {/* Your Logo component */}
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={handleToggleMenu}
              id="closeMenuButton"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover-bg-pink-950">Planning Tools</a>
                <a href="/E-vite" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover-bg-pink-950">E-vite</a>
                <a href="/guestlist" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover-bg-pink-950">Guest-List</a>
                <a href="/registry" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover-bg-pink-950">Registry</a>
                <a href="/vendors" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover-bg-pink-950">Vendors</a>
                <button className="bg-blue-500 text-white text-base font-semibold leading-6 p-2 rounded hover-bg-blue-600">
                  <a href="/login" className="text-white">Login</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
