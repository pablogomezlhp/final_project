import React, { useEffect, useState, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdTimer } from "react-icons/md";
import api from "../../services/api";
import Countdown from 'react-countdown';

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import History from "../../components/History";
import CreditCard from "../../components/CreditCard"
import BubbleImg from "../../assets/decoration.svg";

import ModalAddCredit from "../../components/Modal/ModalAddCredit";
import ModalOrder from "../../components/Modal/ModalOrder";


import { Reoverlay } from "reoverlay";


interface CardProps {
  id:string;
  card_number: string;
  cvc_number?: string;
  expiry_date: string;
  default_card?: string;
  name?: string;
  name_card: string;
}
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

const Dashboard: React.FC = () => {
const header = "Overview";
const [card, setDefaultCard] = useState<CardProps[]>([{
  id:'0',
  name_card: 'teste',
  expiry_date: '00/00',
  card_number: '00000000000'
}]);
const [balance, setBalance] = useState<string>();
const [selectedPeriod, setSelectedPeriod] = useState(60000);
const [buttonDisplay, setButtonDisplay] = useState(false);
const [time, setTime] = useState(0);
const [orders, setOrders] = useState<OrderType[]>([]);

useEffect(() => {
  fetchingCards();
  fetchingBalance();
  handleOrders()
}, []);
const moment = require('moment')


const handleOrders = useCallback(async() => {
  const result = await api.get("/orders");

  const sortedArray  = result.data.reverse();
  setOrders(sortedArray);
  console.log('result.data', result.data  )
},[]);

const fetchingCards = useCallback(async () => {
  const result = await api.get("/cards");
  const defaultCard = result.data.filter((card:any)=>card.default_card == true);
  // const hiddingNumber = defaultCard.card_number.replace(/\d(?=\d{4})/g, "*")
  setDefaultCard(defaultCard);
}, []);

const fetchingBalance = useCallback(async () => {
  const result = await api.get("/credits");
  console.log('data saldo', result.data)
  const Balance = parseInt(result.data[0].balance).toFixed(2)
  setBalance(Balance);
}, []);

const handleCreditModal = useCallback(() => {
  // Reoverlay.showModal(ModalCar);
  Reoverlay.showModal(ModalAddCredit, {
    onConfirm: () => {
      fetchingBalance();
      handleOrders();
    },
  });
}, []);
const handleOrderModal = useCallback(() => {
  Reoverlay.showModal(ModalOrder, {
    onConfirm: (min:any) => {
      setButtonDisplay(true)
      fetchingBalance();
      setSelectedPeriod(+(min*60000));
      setTime(min);
    },
  });
},[]);

const onComplete = () => {
  return setButtonDisplay(false);
};

  return (
    <>
      <NavBar />
      <Layout header={header}>
        <div className="flex flex-col w-full mt-4 px-6 h-full">
         {buttonDisplay == false ?
           <div className="flex justify-center lg:justify-between items-center h-20 lg:px-10  w-full bg-purple-200 rounded-2xl select-none px-4 lg:px-0">

         <div className=" flex flex-1 flex-row  lg:flex-col justify-start pl-4 lg:ml-12">
           <p className="flex text-left text-white font-medium text-md lg:text-2xl">
             Park now!!
           </p>
           <p className="hidden lg:block">Press + and enjoy!!</p>
         </div>
         {/* <img src={BubbleImg} alt="Bubble" /> */}
         <Button onClick={() => handleOrderModal()} className="flex items-center justify-center w-16 h-16 bg-purple-250 rounded-full transition duration-500 ease-in-out hover:bg-purple-300 transform hover:translate-y-0 hover:scale-110">
           <AiOutlinePlus className="text-white" size={40} />
         </Button>
       </div>
       :
       <div className="flex justify-center lg:justify-between items-center h-20 lg:px-10  w-full bg-purple-200 rounded-2xl select-none px-4 lg:px-0">
       <MdTimer className="text-white hidden lg:block" size={64} />

     <div className=" flex flex-1 flex-row  lg:flex-col justify-start pl-4 lg:ml-12">
       <p className="flex text-left text-white font-medium text-md lg:text-2xl">
         You can be parked {time} minutes.
       </p>
       <p className="hidden lg:block">Enjoy the period.</p>
     </div>
     <p className="flex hidden lg:block text-start text-base lg:text-5xl font-bold text-white lg:mr-40">
     <Countdown date={Date.now() + selectedPeriod} intervalDelay={0} precision={3} onComplete={onComplete} />
     </p>
     {/* <img src={BubbleImg} alt="Bubble" /> */}
     <Button onClick={() => handleOrderModal()} className="flex items-center justify-center w-16 h-16 bg-purple-250 rounded-full transition duration-500 ease-in-out hover:bg-purple-300 transform hover:translate-y-0 hover:scale-110">
       <AiOutlinePlus className="text-white" size={40} />
     </Button>
   </div>
        }

          <div className="w-full flex flex-col lg:flex-row justify-between bg-gray-200 rounded-xl my-4 py-4">
            <div className="flex flex-col rounded-md bg-purple-100 text-gray-700 justify-center pl-10 mx-6 h-32">
              <div className="flex">
                <p className="font-medium text-xl w-40">Car parket in</p>
              </div>

              <p className="font-bold text-lg py-2">Dorset Street</p>
              <p className="font-medium text-md">03ER45W</p>
            </div>

            <div className="flex flex-col flex-1 items-center justify-center my-6 lg:my-0">
              <p className="text-base lg:text-xl font-medium">Credits</p>
              <p className="text-base lg:text-3xl font-bold">€{balance}</p>
              <Button onClick={() => handleCreditModal()}  className="transition duration-500 ease-in-out bg-purple-200 h-12 w-48 rounded-3xl border-none px-2 mx-4  mt-1 hover:bg-purple-300 hover:text-purple-100 text-white text-base focus:outline-none">
                Add Credit
              </Button>
            </div>
            {/* <CreditCard /> */}
            <div className="flex flex-col rounded-md bg-gradient-to-r from-indigo-100 h-32 to-purple-200 text-white justify-center pl-10 mx-6">
              <div className="flex">
                <p className="font-medium text-xl w-40">{card[0]?.name_card}</p>
              </div>

              <p className="font-medium text-lg">{card[0]?.card_number.replace(/\d(?=\d{4})/g, "*")}</p>
              <p className="font-medium text-md">{card[0]?.expiry_date}</p>
            </div>
          </div>

          <div>
            <span className="hidden lg:block text-sm font-bold">
              Check your last schedules...
            </span>
          </div>

          <div className="hidden lg:block flex flex-col w-full  lg:px-10 py-6 overflow-auto h-200px mt-2">
            {orders?.map((order, index) => {
              // console.log('ORDER', order)
              return (
                <History key={index} data={order}/>
              );
            })}
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Dashboard;
