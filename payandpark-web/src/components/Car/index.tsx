import React, { useCallback, useState } from "react";
import { Reoverlay } from 'reoverlay';

import { RiSettings5Line } from "react-icons/ri";
import cogoToast from 'cogo-toast';


import api from "../../services/api"

import Dropdown from "../../components/Dropdown";
import ModalCar from "../../components/Modal/ModalCar"


import LogoCar from "../../assets/svg.svg";

interface propsObject {
  id:string;
  model: string;
  year: number;
  vehicle_registration: string;
  color: string;
}

interface CarProps {
  props: propsObject;
  loadInfo: () => void;
}

const Car: React.FC<CarProps> = ({ props, loadInfo = () => {} }) => {
 const[car, setCar] = useState(props)
  const options = [
    {
      label: "Edit",
    },
    {
      label: "Set as default",
    },
    {
      label: "Delete",
    },
  ];

  const handleOnClickDropdown = useCallback((label: string) => {
    // console.log("handle dropdown", label);
    if(label === 'Delete'){
      cogoToast.loading('Loading your data...' , { position: 'top-right' }).then(async () => {
        await api.delete(`/cars/${props.id}`);
  
        cogoToast.success('Car deleted!', { position: 'top-right' });
        loadInfo();
      });
    } else if(label === 'Set as default'){
      cogoToast.loading('Setting as Default...' , { position: 'top-right' }).then(async () => {
        const { year,
          model,
        vehicle_registration,
        color,
      } = car
       try {
        const result = await api.put(`/cars/${car.id}`, {
          year,
          model,
        vehicle_registration,
        color,
        default_car:true
        });
        cogoToast.success('Car marked as a default!', { position: 'top-right' });

       } catch (error) {
          console.log('error', error)
       }


      });

    } else {
      handleModal(props);
    }
  },[props]);

  const handleModal = useCallback((carDetail) => {
    // Reoverlay.showModal(ModalCar);
    Reoverlay.showModal(ModalCar, {
      carDetails:carDetail,
      onConfirm: () => {
        loadInfo()
      }
    })
  }, []);

  return (
    <div className="flex w-full justify-between bg-gray-200 rounded-3xl py-4 px-4 my-6">
      <div className="w-2/3">
        {" "}
        <img src={LogoCar} alt="" />
      </div>
      <div className="flex flex-col justify-center w-full ml-2 lg:0">
        <p className="font-medium">Model: {
        props.model}</p>
        <p className="font-medium py-4">
          Vehicle registration: {
          props.vehicle_registration}
        </p>
        <p className="font-medium">Colour: {
        props.color}</p>
        <p className="font-medium py-4">Year: {
        props.year}</p>
      </div>
      <Dropdown
        icon={RiSettings5Line}
        options={options}
        onClickLabel={handleOnClickDropdown}
      />
    </div>
  );
};

export default Car;
