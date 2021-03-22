import React from 'react';

interface headerProps {
    header:string
}

const ContentContainer:React.FC<headerProps> = ( {header, children }) => {

  return (
    <div className="flex flex-col items-center w-full shadow-lg py-4 mt-4 bg-gray-100 h-650px">
      <div className="flex w-full h-12 border-b-2 border-purple-100 mt-6">
        <h1 className="flex justify-start text-start items-start font-bold text-3xl text-black top-0 w-full pl-6 select-none">{header}</h1>
      </div>
      {children}
    </div>
  )
}

export default ContentContainer;