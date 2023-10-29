import React from 'react';

const NavBar = () => {
  let Links = [
    { name: 'Planning Tools', link: '/' },
    { name: 'E-vite', link: '/' },
    { name: 'Guest List', link: '/' },
    { name: 'Registry', link: '/' },
    { name: 'Vendors', link: '/' },
  ];
  
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-black py-4 md:px-10 px-7'>
        <div>
          {/* Logo component */}
          <Logo />
        </div>

        <ul className='md:flex md:items-center'>
          {Links.map(link => (
            <li key={link.name} className='md:ml-8 text-x1'>
              <a href={link.link} className='text-white hover:text-primary duration-500'>
                {link.name}
              </a>
            </li>
          ))
          }
          
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
