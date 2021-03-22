import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';

import Button from '../Button';
import { FiMenu } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { user, signOut } = useAuth();

  return (
    <>
      <header className="relative flex flex-wrap w-full items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-100 mb-0 shadow-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black text-base"
              to="/"
            >
              Pay and Park
            </Link>
            <button
              className="text-purple-200 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FiMenu size={20} />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center justify-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center ">
              <li className="nav-item mr-2">
                {!!user ? 
                  <span onClick={() => signOut()} className="transition duration-500 ease-in-out px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-purple-200 hover:text-purple-300 ml-2 text-base cursor-pointer">
                    Log out
                  </span>
                :
                  <Link 
                    className="transition duration-500 ease-in-out px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-purple-200 hover:text-purple-300"
                    to="/signin"
                  >
                    <span className="ml-2 text-base ">Login</span>
                  </Link>
                }
                
              </li>
              <li className="nav-item ">
                {!!!user &&
                  <Link to='/signup' >
                    <Button className="transition duration-500 ease-in-out bg-purple-200 h-12 w-48 rounded-3xl border-none px-2 mx-4  mt-1 hover:bg-purple-300 text-white text-base focus:outline-none ">
                        Create account
                    </Button>
                </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;