import React, { useCallback } from "react";
import { RiSettings5Line } from "react-icons/ri";
import Dropdown from "../../components/Dropdown";

const Card = () => {
  const options = [{
    label: 'Edit'
  },
  {
    label: 'Set as default'
  }];

  const handleOnClickDropdown = useCallback((label: string) => {
    console.log("handle dropdown", label);

  }, []);

  return (
    <div className="flex flex-col rounded-md bg-gradient-to-r from-indigo-100 h-32 to-purple-200 text-white justify-center pl-10 mx-6">
      <div className="flex">
        <p className="font-medium text-xl w-40">Pablo Silva</p>
        <Dropdown icon={RiSettings5Line} options={options} onClickLabel={handleOnClickDropdown} />
      </div>

      <p className="font-medium text-lg">*********4324</p>
      <p className="font-medium text-md">09/21</p>
    </div>
  );
};

export default Card;
