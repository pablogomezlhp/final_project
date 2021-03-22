import React, { useCallback, useState } from "react";
import { Reoverlay } from 'reoverlay';

import { RiSettings5Line } from "react-icons/ri";
import cogoToast from 'cogo-toast';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';


import api from '../../services/api';
import ModalCreditCard from "../Modal/ModalCreditCard";
import Dropdown from "../Dropdown";

interface propsObject {
  id:string;
  card_number: string;
  cvc_number: string;
  expiry_date: string;
  default_card?: string;
  name: string;
  name_card: string;
}

interface CardProps {
  props: propsObject;
  loadInfo: () => void;
}

const CreditCard:React.FC<CardProps>  = ({ props, loadInfo = () => {} }) => {
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
    console.log("handle dropdown", label);
    if(label === 'Delete'){
      cogoToast.loading('Loading your data...' , { position: 'top-right' }).then(async () => {
        await api.delete(`/cards/${props.id}`);
  
        cogoToast.success('Card deleted!', { position: 'top-right' });
        loadInfo();
      });
    } else if(label === 'Set as default'){

    } else {
      handleModal(props);
    }
  }, [props]);

  const handleModal = useCallback((cardDetails)=>{
    // Reoverlay.showModal(ModalCar);
    Reoverlay.showModal(ModalCreditCard, {
      cardDetails:cardDetails,
      onConfirm: () => {
        loadInfo()
      }
    })
  }, []);
  
    return (
      <div
      className=" flex mx-4 h-auto" id="PaymentForm">
        <Cards
          cvc={props.cvc_number}
          expiry={props.expiry_date}

          name={props.name_card}
          number={props.card_number}
        />
        <Dropdown
        icon={RiSettings5Line}
        options={options}
        onClickLabel={handleOnClickDropdown}
      />
      </div>
    );
  }
export default CreditCard;

