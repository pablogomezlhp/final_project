import React, { useState } from "react";
import { IconBaseProps } from 'react-icons';
import { Link } from 'react-router-dom';

interface OptionsObject {
    path?: string;
    label: string;
}

interface DropdownProps {
    avatar?: string;
    icon?: React.ComponentType<IconBaseProps>;
    label?: string;
    options: Array<OptionsObject>;
    onClickLabel?: (label: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ avatar, icon: Icon, label, options, onClickLabel = () => {} }) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div onMouseLeave={() => setDropDown(false)} className="relative inline-block text-left">
      <div>
        {label &&
            <span className="rounded-md shadow-sm">
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onMouseDown={() => setDropDown(true)}
                >
                    {label}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </span>
        }
        {Icon &&
            <span className="rounded-md shadow-sm">
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={() => setDropDown(!dropDown)}
                >
                    <Icon size={20} />
                </button>
            </span>
        }
        
      </div>
      {dropDown && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
                {options?.map(option => {
                    return (
                        <div key={option.label}>
                            {option.path ?
                                <Link
                                    to={option.path}
                                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                    role="menuitem"
                                >
                                    {option.label}
                                </Link>
                            :
                                <span onClick={()=> onClickLabel(option.label)} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer">
                                    {option.label}
                                </span>
                            }
                        </div>
                    );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
