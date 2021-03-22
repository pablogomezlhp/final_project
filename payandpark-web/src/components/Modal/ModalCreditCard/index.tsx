import React, { useState, useEffect, useCallback } from "react";
import Cards from 'react-credit-cards';
import { ModalWrapper, Reoverlay } from 'reoverlay';
import cogoToast from 'cogo-toast';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import api from '../../../services/api';


import Button from "../../Button";

import 'reoverlay/lib/ModalWrapper.css';
import 'react-credit-cards/es/styles-compiled.css';


interface MyFormValues {
  id:string;
  card_number: string;
  cvc_number: string;
  expiry_date: string;
  default_card?: string;
  name: string;
  name_card:string;
}

interface ModalCarProps {
  onConfirm: () => void;
  cardDetails?:MyFormValues;
}
const CreditCardFormSchema = Yup.object().shape({
    
    card_number: Yup.string()
    .required("Number is required"),
    cvc_number: Yup.string().required("cvc is required"),
    expiry_date: Yup.string()
    .required("Expiry date is required"),
    name: Yup.string()
    .required("Name is required"),
    name_card: Yup.string()
    .required("Holder's name is required"),
});

// interface MyFormValues {
//   card_number: string;
//   cvc_number: string;
//   expiry_date: string;
//   default_card?: string;
//   name: string;
//   name_card:string;
// }

const ModalCreditCard: React.FC<ModalCarProps> = ({ onConfirm, cardDetails}) => {


  const initialValues: MyFormValues = { 
    card_number: cardDetails !== undefined ? cardDetails.card_number : '', 
    cvc_number: cardDetails !== undefined ? cardDetails.cvc_number: '',
    expiry_date: cardDetails !== undefined ? cardDetails.expiry_date : '',
    name_card: cardDetails !== undefined ? cardDetails.name_card : '',
    name: cardDetails !== undefined ? cardDetails.name : '',
    id: cardDetails !== undefined ? cardDetails.id : '',


  };

  const closeModal = useCallback(() => {
    Reoverlay.hideModal();
  }, []);

  const handleSubmit = useCallback(async (values: MyFormValues) => {
    try {

      const data = {
        card_number: values.card_number.trim(),
        cvc_number: values.cvc_number.trim(),
        expiry_date: values.expiry_date.trim(),
        name_card: values.name_card.trim(),
        name: values.name.trim(),
        default_card:true

      };

      // await SignupSchema.validate(data, {
      //   abortEarly:false,
      // });

      if(cardDetails === undefined){
        cogoToast.loading('Loading your data...' , { position: 'top-right' }).then(async () => {
          await api.post('/cards', data);
  
          cogoToast.success('Card added!', { position: 'top-right' });

          onConfirm();
          Reoverlay.hideModal();
        });

      } 
      else {
        cogoToast.loading('Loading your data...' , { position: 'top-right' }).then(async () => {
          await api.put(`/cards/${cardDetails.id}`, data);
          cogoToast.success('Card updated!', { position: 'top-right' });
          onConfirm();
          Reoverlay.hideModal();
        });
      }

      // history.push('/signin');
      
    } catch (err) {
      cogoToast.error('Error while making registration, try again!', { position: 'top-right' });
      console.log(err);
    }
  }, []);

  return (
    <ModalWrapper  animation='slideLeft'>
      <div className="py-10 mx-4 lg:mx-20 w-420px">
        {cardDetails !== undefined ?<h3 className="flex justify-center w-full text-center text-2xl mt-8 md:mt-0  md:text-3xl font-bold select-none">
          Edit your card info
        </h3>:<h3 className="flex justify-center w-full text-center text-2xl mt-8 md:mt-0  md:text-3xl font-bold select-none">
          Add a new Credit Card
        </h3>}

      

        <Formik
          initialValues={initialValues}
          validationSchema={CreditCardFormSchema}
          onSubmit={(values) => {
            // same shape as initial values
            handleSubmit(values);
          }}
        >
          {({ errors, touched, validateForm, values }) => (
            <div className="w-full  select-none ">
              <Form className=" mb-6 md:mb-0  w-full  mt-4">
              <label className="w-full  block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Give one name to a card
                  <Field 
                    className="w-full appearance-none block bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 focus:border-purple-200"
                    name="name" 
                  />
                </label>
                {errors.name && touched.name ? (
                  <div className="text-red-400">{errors.card_number}</div>
                ) : null}
                <label className="w-full  block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Card number
                  <Field 
                    className="w-full appearance-none block bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 focus:border-purple-200"
                    name="card_number" 
                  />
                </label>
                {errors.card_number && touched.card_number ? (
                  <div className="text-red-400">{errors.card_number}</div>
                ) : null}

                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Card name holder
                  <Field 
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 focus:border-purple-200"
                    name="name_card" 

                  />
                </label>
                {errors.name_card && touched.name_card ? (
                  <div className="text-red-400">{errors.name_card}</div>
                ) : null}
  <div className="flex "><div className="flex flex-col">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Valid Thru
                  <Field 
                    className="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 w-full focus:border-purple-200"
                    name="expiry_date" 
                  />
                </label>
                {errors.expiry_date && touched.expiry_date? (
                  <div className="text-red-400">{errors.expiry_date}</div>
                ) : null }
</div>
<div className="flex flex-col ml-2">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  CVC
                  <Field 
                    className="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 w-full focus:border-purple-200"
                    name="cvc_number" 
                  />
                </label>
                {errors.cvc_number && touched.cvc_number ? (
                  <div className="text-red-400">{errors.cvc_number}</div>
                ) : null }
                </div>
                </div>

                <div className="flex">
                  <Button  onClick={closeModal} className="transition mr-10 duration-500 ease-in-out bg-red-400 h-12 w-full rounded-3xl border-none px-2 mt-1 hover:bg-red-600 text-white text-base focus:outline-none ">
                    Cancel
                  </Button>
                  <Button  type="submit" className="transition duration-500 ease-in-out bg-green-400 h-12 w-full rounded-3xl border-none px-2 mt-1 hover:bg-green-600 text-white text-base focus:outline-none ">
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>


      </div>
    </ModalWrapper>
  );
};

export default ModalCreditCard;
