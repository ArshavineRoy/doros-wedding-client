import React, { useState } from "react";
import Logo from "./Logo";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8 bg-black h-20" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 ">
            <Logo/>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
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
       
        <div className={`lg:flex lg:gap-x-8 mt-2  ${menuOpen ? 'hidden' : 'block'}`}>
           <a href="/planning-tools" className="text-base font leading-6 text-white hover:text-[#73332D]">Planning Tools</a>
           <a href="/E-vite" className="text-base font leading-6 text-white hover:text-[#73332D]">E-vite</a>
           <a href="/guestlist" className="text-base font leading-6 text-white hover:text-[#73332D]">Guest-List</a>
           <a href="/registry" className="text-base font leading-6 text-white hover:text-[#73332D]">Registry</a>
           <a href="/vendors" className="text-base font leading-6 text-white hover:text-[#73332D]">Vendors</a>
           <button className="bg-white text-black text-base font-semibold leading-6 p-0.5 w-20 mb-1 rounded hover:bg-[#73332D]">
             <a href="/login" className="text-black">LOGIN</a>
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
              <Logo/>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
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
                <a href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#73332D]">Planning Tools</a>
                <a href="/E-vite" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#73332D]">E-vite</a>
                <a href="/guestlist" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#73332D]">Guest-List</a>
                <a href="/registry" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#73332D]">Registry</a>
                <a href="/vendors" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#73332D]">Vendors</a>
                <button className="bg-white text-white text-base font-semibold leading-6 p-2 rounded hover:bg-[#73332D]">
  <a href="/login" className="text-black">Login</a>
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
