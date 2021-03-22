import React, { useState, useEffect, useCallback } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Reoverlay } from "reoverlay";

import { useAuth } from '../../hooks/Auth';

import api from "../../services/api";

import ModalCreditCard from "../../components/Modal/ModalCreditCard";
import ModalAddCredit from "../../components/Modal/ModalAddCredit";


import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import Button from "../../components/Button";

import Wallet from "../../assets/wallet.svg";
import BubbleImg from "../../assets/decoration.svg";
import Card from "../../components/Card";
import CreditCard from "../../components/CreditCard";

interface CardProps {
  id:string;
  card_number: string;
  cvc_number: string;
  expiry_date: string;
  default_card?: string;
  name: string;
  name_card: string;
}
interface BalanceProps {
  balance:number;
}

const MyWallet: React.FC = () => {
  const header = "My Wallet";
  const [CardsList, setCards] = useState<CardProps[]>([]);
  const [balance, setBalance] = useState<number>();
  const {user} = useAuth();

  useEffect(() => {
    fetchingCards();
    fetchingBalance();
  }, []);

  const fetchingCards = useCallback(async () => {
    const result = await api.get("/cards");
    setCards(result.data);
  }, []);
  const fetchingBalance = useCallback(async () => {
    const result = await api.get("/credits");
    console.log('data saldo', result.data)
    const Balance = parseInt(result.data[0].balance)
    setBalance(Balance);
  }, []);

  const handleModal = useCallback(() => {
    // Reoverlay.showModal(ModalCar);
    Reoverlay.showModal(ModalCreditCard, {
      onConfirm: () => {
        fetchingBalance();
      },
    });
  }, [fetchingBalance]);

  const handleCreditModal = useCallback(() => {
    // Reoverlay.showModal(ModalCar);
    Reoverlay.showModal(ModalAddCredit, {
      onConfirm: () => {
        fetchingBalance();
        console.log('fechou')
      },
    });
  }, [fetchingBalance]);

  

  return (
    <>
      <NavBar />
      <Layout header={header}>
        <div className="flex flex-col justify-center items-center  w-full mt-4 px-6 select-none">
          <div className="w-full flex justify-between bg-gray-200 rounded-xl  py-2">
            <div>
              <img src={Wallet} alt="Wallet" />
            </div> 
            <div className="flex flex-col  flex-1 items-center justify-center">
              <p className="text-base lg:text-2xl font-medium">Credits</p>
              <p className="text-base lg:text-5xl font-bold">€{balance?.toFixed(2)}</p>
            </div>
              
            <Button onClick={() => handleCreditModal()}  className="transition duration-500 ease-in-out bg-purple-200 h-8 w-32 lg:h-12 lg:w-48 rounded-3xl border-none px-2 mx-4 mt-1 hover:bg-purple-300 hover:text-purple-100 text-white text-xs lg:text-base focus:outline-none ">
              Add Credit
            </Button>
          </div>
          <div className="flex justify-between items-center h-20 px-2  lg:px-10 mt-2  w-full bg-purple-200 rounded-2xl select-none">
            <Button
              onClick={() => handleModal()}
              className="flex items-center justify-center w-16 h-16 bg-purple-250 rounded-full transition duration-500 ease-in-out hover:bg-purple-300 transform hover:translate-y-0 hover:scale-110"
            >
              <AiOutlinePlus className="text-white" size={40} />
            </Button>
            <div className=" flex flex-1  flex-col justify-start ml-2 lg:ml-12">
              <p className="flex text-left text-white font-medium text-md lg:text-2xl">
                Add a new card
              </p>
              <p className="hidden lg:block">lorem impsun</p>
            </div>
            <img src={BubbleImg} alt="Bubble" />
          </div>
          <div className="flex  rounded-xl lg:px-10 py-2 overflow-x-scroll  w-300px lg:w-880px mt-2 px-6">
            { 
              CardsList?.map((card, index) => {
                return(
                  <CreditCard key={index} props={card} loadInfo={fetchingCards}/>
                )
              })
            }
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default MyWallet;
