import React, { useState } from 'react';
import Button from './Button';

const NavBar = () => {
  let Links = [
    { name: 'Planning Tools', link: '/' },
    { name: 'E-vite', link: '/' },
    { name: 'Guest List', link: '/' },
    { name: 'Registry', link: '/' },
    { name: 'Vendors', link: '/' },
  ];
  let [open, setOpen]=useState(false);
  
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-black py-4 md:px-10 px-7'>
        <div>
          {/* Logo component */}
          <Logo />
        </div>
        <div onClick={()=>setOpen(!open)} className='text-3x1 absolute right-8 top-6 cursor-pointer md:hidden'>
        <ion-icon name={open ? 'close': 'menu'}></ion-icon>
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg:white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-9 transition-all duration-500 ease-in
        ${open? 'top-20 opacity-100':'top-[-490px]'}md:opacity-100 opacity-0`}>
          {Links.map(link => (
            <li key={link.name} className='md:ml-8 text-x1 md:my-0 my-7'>
              <a href={link.link} className='text-white hover:text-primary duration-500'>
                {link.name}
              </a>
            </li>
          ))
          }
          <Button>Login</Button>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
