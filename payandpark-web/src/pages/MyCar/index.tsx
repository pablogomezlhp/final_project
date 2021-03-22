import React, {useCallback, useEffect, useState} from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Reoverlay } from 'reoverlay';

import ModalCar from '../../components/Modal/ModalCar';

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Car from "../../components/Car"
// import ModalCar from "../../components/Modal/ModalCar";

import BubbleImg from "../../assets/decoration.svg";

import api from '../../services/api';

interface CarProps{
  id:string; 
  model:string,
  year:number,
  vehicle_registration:string,
  color:string;
}

const MyCar: React.FC = () => {
  const header = "My Car";
  const [data, setData] = useState<CarProps[]>([]); 

  const fetchingCars = useCallback(async () => {
    const result = await api.get('/cars')
    console.log('carros', result.data)
    setData(result.data)
  },[]);

  useEffect(()=> {
    fetchingCars()
   },[fetchingCars])

  const handleModal = useCallback(()=>{
    // Reoverlay.showModal(ModalCar);
    Reoverlay.showModal(ModalCar, {
      onConfirm: () => {
        fetchingCars();
      }
    })
  }, [fetchingCars]);

  return (
    <>
      
      <NavBar />
      <Layout header={header}>
        {/* {openModalCar &&
          <ModalCar open={openModalCar} onClose={handleModalCarOnClose} />
        } */}
        <div className="flex flex-col  w-full mt-4 px-6 z-0">
          <div className="flex justify-between items-center h-20 px-10  w-full bg-purple-200 rounded-2xl select-none">
            <Button  onClick={() => { handleModal() }} className="flex items-center justify-center w-16 h-16 bg-purple-250 rounded-full transition duration-500 ease-in-out hover:bg-purple-300 transform hover:translate-y-0 hover:scale-110">
              <AiOutlinePlus className="text-white" size={40} />
            </Button>
            <div className=" flex flex-1  flex-col justify-start ml-2 lg:ml-12">
              <p className="flex text-left text-white font-medium text-md lg:text-2xl">
                Add a new car
              </p>
              <p className="hidden lg:block">lorem impsun</p>
            </div>
            <img src={BubbleImg} alt="Bubble" />
          </div>
            <div className="flex flex-col w-full  lg:px-10 py-6 overflow-auto h-420px mt-10">
              {data?.map((car)=>{
                return(
                  <Car key={car.id} props={car} loadInfo={fetchingCars} />
                )
              })}
            </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default MyCar;
