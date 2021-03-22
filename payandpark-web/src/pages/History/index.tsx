import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import HistoryComponent from "../../components/History";
import Button from "../../components/Button";

import HistoryImg from "../../assets/history.svg";
import BubbleImg from "../../assets/decoration.svg";
import Card from "../../components/Card";

interface OrderType {
  active: Boolean;
  car: object;
  car_id: string;
  created_at: string;
  driver: object;
  driver_id: string;
  id: string;
  latitude: string;
  longitude: string;
  order_number: string;
  price: string;
  reservation: {
    id: string;
    start_reservation: string;
    end_reservation: string;
    created_at: string;
    updated_at: string;}
  reservation_id: string;
  updated_at:string;
  }
const History: React.FC = () => {
  const header = "My History";
const [orders, setOrders] = useState<OrderType[]>([]);
useEffect(() => {
  handleOrders();
},[])

  const handleOrders = useCallback(async() => {
    const result = await api.get("/orders");
  
    const sortedArray  = result.data.reverse();
    setOrders(sortedArray);
    console.log('result.data', result.data  )
  },[]);

  return (
    <>
      <NavBar />
      <Layout header={header}>
        <div className="flex flex-col  w-full mt-4 px-6 select-none">
          <div className="w-full h-64 flex justify-between bg-gray-200 rounded-xl my-4 py-4">
            <div className="pl-4">
              <img className="h-56" src={HistoryImg} alt="Wallet" />
            </div>
            <div className="flex flex-col  flex-1 items-center justify-center">
              {/* <p className="text-base lg:text-2xl font-medium">Credits</p>
              <p className="text-base lg:text-5xl font-bold">$20.00</p> */}
            </div>
            {/* <Button className="transition duration-500 ease-in-out bg-purple-100 h-12 w-48 rounded-3xl border-none px-2 mx-4  mt-1 hover:bg-purple-300 hover:text-purple-100 text-purple-200 text-base focus:outline-none ">
              Add Credit
            </Button> */}
          </div>
          <div className="flex flex-col w-full  lg:px-10 py-6 overflow-auto h-250px mt-2">
            
          {orders?.map((order, index) => {
              // console.log('ORDER', order)
              return (
                <History key={index} />
                
              );
            })}
            
           
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default History;
