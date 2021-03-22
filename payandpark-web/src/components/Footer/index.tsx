import React from 'react';
import { BsChatDotsFill } from 'react-icons/bs';

const Footer:React.FC = () => {

  return (
    <footer className="flex footer justify-between w-full border-t-2 border-purple-100 bottom-0 left-0 mt-4 p-4">
        <div className="flex flex-col ml-4 md:ml-24 my-2">
          <p className="text-purple-200 text-xs md:text-base">©PayandPark™, 2020.</p>
          <p className="text-xs md:text-base"> Company Registration Number: 11111111.</p>
        </div>
        <div className="flex rounded-full bg-purple-100 h-10 w-10 items-center justify-center mr-4 md:mr-24 my-2 text-purple-300 cursor-pointer">
          <BsChatDotsFill size={20} />
        </div>
    </footer>
  )
}

export default Footer;