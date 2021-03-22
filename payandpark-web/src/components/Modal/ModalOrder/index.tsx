import React, { useState, useEffect, useCallback } from "react";
import { ModalWrapper, Reoverlay } from 'reoverlay';
import cogoToast from 'cogo-toast';
import Select from 'react-select'

import api from '../../../services/api';
import { useAuth } from '../../../hooks/Auth';

import Button from "../../Button";

import 'reoverlay/lib/ModalWrapper.css';

interface MyFormValues {
  id?: string;
  model: string;
  vehicle_registration: string;
  color: string;
  year: string;
}
interface carDataType {
  color: string;
  created_at: string;
  default_car: Boolean;
  driver: object;
  driver_id: string;
  id: string;
  model: string;
  updated_at: string;
  vehicle_registration: string;
  year: number
}

interface ModalOrderProps {
  onConfirm: (min: number) => void;
  carDetails?: MyFormValues;
}
interface LocationType {
  latitude:number;
  longitude:number;
}
const ModalOrder: React.FC<ModalOrderProps> = ({ onConfirm, carDetails }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [carData, setCarData] = useState<carDataType[]>([]);
  const[location, setLocation] = useState<LocationType>({
    latitude:0,
    longitude:0
  })
  const minutePrice = 0.50

  const initialValues: MyFormValues = {
    year: carDetails !== undefined ? carDetails.year : '',
    model: carDetails !== undefined ? carDetails.model : '',
    vehicle_registration: carDetails !== undefined ? carDetails.vehicle_registration : '',
    color: carDetails !== undefined ? carDetails.color : '',

  };
  useEffect(() => {
    handlelocation();
    fetchingBalance();
    fetchingCars();
  }, [])

  const closeModal = useCallback((min) => {
    Reoverlay.hideModal();
    onConfirm(min);
  }, []);

  const handleSubmit = useCallback(async () => {
    // console.log('balance', balance, total)
    if (balance < total) {
      cogoToast.error('You do not have enough Balance, please go to your wallet and add more.', { position: 'top-right' });
    };
    Reoverlay.hideModal();
    await api.put(`/credits/${user.id}`, {
      balance: balance - total,
      isPaid: true
    });
    cogoToast.success('Payment Succefull.', { position: 'top-right' });
    closeModal(selectedMinute);
    handleOrder();
  }, [balance, total]);

  const handleValue = useCallback(async (selectedMinute) => {
    setTotal(selectedMinute * minutePrice);
    setSelectedMinute(selectedMinute);
  }, []);

  const fetchingBalance = useCallback(async () => {
    const result = await api.get("/credits");
    // console.log('data saldo', result.data)
    const Balance = parseInt(result.data[0].balance)
    setBalance(Balance);
  }, []);

  const fetchingCars = useCallback(async () => {
    const result = await api.get('/cars')
    const car = result.data.filter((car: any) => car.default_car == true);
    setCarData(car);
    // console.log('dddd', car)
  }, []);


  const handlelocation = () =>{
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    });
  };

const handleOrder = useCallback(async () => {
  handlelocation()
  console.log('location', location.latitude, 'longitude',location.longitude, '@@@location', location )

  // console.log('car', carData)
  const data = {
    latitude: location.latitude,
    longitude:location.longitude,
    price:total,
    car_id: carData[0]?.id,
    duration:selectedMinute
  };
  try {
    await api.post('/orders', data);
  } catch (error) {
    console.error(error)
  }
 
},[carData, location, total, selectedMinute]);

  return (
    <ModalWrapper animation='slideLeft'>
      <div className="flex flex-col justify-center items-center py-4">
        <p className="flex text-center">How long it's gonna take?</p>
        <div className="flex flex-row px-20">
          <input onChange={(e) => handleValue(+e.target.value)} type="number" placeholder={'15'} />
          <p>Min</p>
        </div>
        <p>$0,50 per Minute</p>
        <div className="flex flex-row space-between">
          <p>Total</p>
          <p>${total}</p>
        </div>
        <Select options={carData} />
        <Button onClick={() => handleSubmit()} className="transition duration-500 ease-in-out bg-purple-200 h-12 w-48 rounded-3xl border-none px-2 mx-4  mt-1 hover:bg-purple-300 hover:text-purple-100 text-white text-base focus:outline-none">Pay</Button>
      </div>

    </ModalWrapper>
  );
};

export default ModalOrder;
