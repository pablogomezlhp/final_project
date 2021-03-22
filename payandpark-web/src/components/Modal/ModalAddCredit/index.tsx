import React, { useState, useEffect, useCallback } from "react";
import { CardElement, useElements, useStripe, Elements, ElementProps } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { ModalWrapper, Reoverlay } from 'reoverlay';
import cogoToast from 'cogo-toast';
import { Formik, Form, Field } from "formik";
import { useAuth } from '../../../hooks/Auth';




import * as Yup from "yup";
import api from '../../../services/api';

import Button from "../../Button";

import 'reoverlay/lib/ModalWrapper.css';

interface BillingDetails {
  address: Array<Address>;
  email: string;
  name: string;
  phone: string;
}

interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

interface ModalCreditProps {
  onConfirm: () => void;
}

const ModalAddCredit: React.FC<ModalCreditProps> = ({ onConfirm }) => {
  const { user } = useAuth();

  const [selectedValue, setSelectedValue] = useState(0);
  const [cardDetail, setCardDetail] = useState({ token: '' })
  const [isProcessing, setIsProcessing] = useState(false);
  

  const stripe = useStripe();
  const elements = useElements();

  const stripePromise = loadStripe("pk_test_Ni1yGhoLnPDkrOmZRPdu9Dye00eW7psDa6");

  const closeModal = useCallback(() => {
    Reoverlay.hideModal();
    onConfirm();
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    // const billingDetails = {
    //   address: 'payandpark',
    //   email: 'pablogomez.l@live.com',
    //   name: 'payandpark',
    // }
    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet. Make sure to disable
    //   // form submission until Stripe.js has loaded.
    //   return;
    // }
    try {
      const response = await api.post('/payment_intents', {
        amount: selectedValue * 100
      });

      if(response.status == 200) {
        Reoverlay.hideModal();
         await api.put(`/credits/${user.id}`,{
          balance: selectedValue
        });
        closeModal()
        return
      };

      // const cardEs = elements.getElement(CardElement);

      console.log('cardElement', response);



      // const paymentMethodReq = await stripe?.createPaymentMethod({
      //   type: "card",
      //   card: cardElement==null ?cardElement: {token: 'string;'},
      //   billing_details: {
      //     address: {
      //       city: 'dublin 01',
      //       country: 'ireland',
      //       line1: '46 derrynane square',
      //       postal_code: 'd07ce11',
      //       state: 'dublin, ireland'
      //     },
      //     name: 'pablo patrick',
      //     email: 'pablogomez.l@live.com',
      //     phone: '0896065434'
      //   }
      // });

      // if (paymentMethodReq?.error) {
      //   setIsProcessing(false);
      //   return;
      // }

      // const response = await stripe?.confirmCardPayment(clientSecret, {
      //   payment_method: paymentMethodReq?.paymentMethod?.id
      // });

      // if (response?.error) {
      //   setIsProcessing(false);
      //   return;
      // }

    } catch (err) {
      cogoToast.error('Error while making registration, try again!', { position: 'top-right' });
      console.log(err);
      console.log('Deu erro.')

    }
  }, [selectedValue]);
  const handleToken = useCallback((token, addresses) => {
    console.log('token', token, addresses)

  }, [])
  

  return (
    <Elements stripe={stripePromise}>
      <ModalWrapper animation='slideLeft'>
        <form onSubmit={handleSubmit}>
          <div className="py-10 mx-4 lg:mx-20 w-420px">
            <h3 className="flex justify-center w-full text-center text-2xl mt-8 md:mt-0  md:text-3xl font-bold select-none">
              Add a credit
        </h3>
            <div className="flex justify-between my-10">
              <p>Select the Value</p>
              <section className="flex">
                <p className="ml-10">€ </p>
                <input type="number" name="valor" id="" onChange={(e) => {setSelectedValue(parseInt(e.target.value))}} />
              </section>

            </div>
            <div className="my-10">
              <CardElement />
            </div>

            <Button type="submit" disabled={isProcessing} className="transition duration-500 ease-in-out bg-purple-200 h-8 w-32 lg:h-12 lg:w-48 rounded-3xl border-none px-2 mx-4 mt-1 hover:bg-purple-300 hover:text-purple-100 text-white text-xs lg:text-base focus:outline-none ">
              {isProcessing ? "Processing..." : `Add € ${selectedValue}`}
            </Button>
          </div>
        </form>
      </ModalWrapper>
    </Elements>
  );
};

export default ModalAddCredit;
