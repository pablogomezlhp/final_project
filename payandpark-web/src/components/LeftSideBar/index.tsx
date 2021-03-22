import React from "react";
import {
  RiCarLine,
  RiFileHistoryLine,
  RiWallet3Line,
  RiUser3Line,
  RiNotification4Line,
  RiSettings5Line,
  RiLockUnlockLine,
} from "react-icons/ri";
import { BsHouseDoor } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import Button from '../../components/Button';


const LeftSideBar: React.FC = () => {
  const { user, signOut } = useAuth();
  
  return (
    <div className="flex hidden lg:block items-center justify-center bg-gray-100 py-4 mr-2 select-none">
      <div className="flex w-full max-w-xs p-4 bg-white shadow-lg h-650px">
        <ul className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full h-14 border-b-2 border-purple-100 px-1">
            <div className="h-16 w-16 rounded-full bg-gray-300 mb-2"></div>
            <div className="flex flex-col mr-2">
              <p className="font-medium">Welcome,</p>
              <p className="font-bold">{user.username.replace(/\b(\w)/g, s => s.toUpperCase())}</p>
            </div>
          </div>
          <li className="my-px">
            <Link
              to="/dashboard"
              className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <BsHouseDoor size={22} />
              </span>
              <span className="ml-3">Overview</span>
              <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">
                3
              </span>
            </Link>
          </li>
          <li className="my-px">
            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
              management
            </span>
          </li>
          <li className="my-px">
            <Link
              to="/mycar"
              className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <RiCarLine size={22} />
              </span>
              <span className="ml-3">My car</span>
            </Link>
          </li>
          <li className="my-px">
            <Link
              to="/history"
              className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <RiFileHistoryLine size={22} />
              </span>
              <span className="ml-3">History</span>
            </Link>
          </li>
          <li className="my-px">
            <Link
              to="/mywallet"
              className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <RiWallet3Line size={22} />
              </span>
              <span className="ml-3">My wallet</span>
            </Link>
          </li>
          <li className="my-px">
            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
              Account
            </span>
          </li>
          <li className="my-px">
            <Link
              to="/profile"
              className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <RiUser3Line size={22} />
              </span>
              <span className="ml-3">Profile</span>
            </Link>
          </li>
          <li className="my-px">
            <Link
              to="/notifications"
              className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <RiNotification4Line size={22} />
              </span>
              <span className="ml-3">Notifications</span>
              <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">
                10
              </span>
            </Link>
          </li>
          <li className="my-px">
            <Link
              to="/settings"
              className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <RiSettings5Line size={22} />
              </span>
              <span className="ml-3">Settings</span>
            </Link>
          </li>
          <li className="my-px">
            <Button
              type="button"
              onClick={() => signOut()}
              className="flex w-full flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center text-lg text-red-400">
                <RiLockUnlockLine size={22} />
              </span>
              <span className="ml-3">Logout</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSideBar;
