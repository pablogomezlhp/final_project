import React, { useState, useEffect, useCallback } from "react";
import { ModalWrapper, Reoverlay } from 'reoverlay';
import cogoToast from 'cogo-toast';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import api from '../../../services/api';
import { useAuth } from '../../../hooks/Auth'; 

import Button from "../../Button";

import 'reoverlay/lib/ModalWrapper.css';

const CarFormSchema = Yup.object().shape({
  model: Yup.string()
    .required("Model is required"),
  vehicle_registration: Yup.string().required("Vehicle registration is required"),
  color: Yup.string()
    .required("Color is required"),
  year: Yup.string()
    .required("Year is required"),
});

interface MyFormValues {
  id?: string;
  model: string;
  vehicle_registration: string;
  color: string;
  year: string;
}

interface ModalCarProps {
  onConfirm: () => void;
  carDetails?:MyFormValues;
}

const ModalCar: React.FC<ModalCarProps> = ({ onConfirm, carDetails}) => {
  const { user } = useAuth();
  const initialValues: MyFormValues = { 
    year: carDetails !== undefined ? carDetails.year : '',
    model: carDetails !== undefined ? carDetails.model : '', 
    vehicle_registration: carDetails !== undefined ? carDetails.vehicle_registration: '',
    color: carDetails !== undefined ? carDetails.color : '',
    
  };

  const closeModal = useCallback(() => {
    Reoverlay.hideModal();
  }, []);

  const handleSubmit = useCallback(async (values: MyFormValues) => {
    try {

      const data = {
        model: values.model.trim(),
        year: typeof(values.year) === 'string' ? values.year.trim() : values.year,
        color: values.color.trim(),
        vehicle_registration: values.vehicle_registration.trim(),
        driver_id: user.id,
        default_car: true
      };

      // await SignupSchema.validate(data, {
      //   abortEarly:false,
      // });

      if(carDetails === undefined){
        cogoToast.loading('Loading your data...' , { position: 'top-right' }).then(async () => {
          await api.post('/cars', data);
  
          cogoToast.success('Car added!', { position: 'top-right' });
          onConfirm();
          Reoverlay.hideModal();
        });

      } else {
        cogoToast.loading('Loading your data...' , { position: 'top-right' }).then(async () => {
          await api.put(`/cars/${carDetails.id}`, data);
  
          cogoToast.success('Car updated!', { position: 'top-right' });
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
        {carDetails !== undefined ?<h3 className="flex justify-center w-full text-center text-2xl mt-8 md:mt-0  md:text-3xl font-bold select-none">
          Edit your car info
        </h3>:<h3 className="flex justify-center w-full text-center text-2xl mt-8 md:mt-0  md:text-3xl font-bold select-none">
          Add a new car
        </h3>}

        <Formik
          initialValues={initialValues}
          validationSchema={CarFormSchema}
          onSubmit={(values) => {
            // same shape as initial values
            handleSubmit(values);
          }}
        >
          {({ errors, touched, validateForm, values }) => (
            <div className="w-full  select-none ">
              <Form className=" mb-6 md:mb-0  w-full  mt-4">
                <label className="w-full  block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Model
                  <Field 
                    className="w-full appearance-none block bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 focus:border-purple-200"
                    name="model" 
                  />
                </label>
                {errors.model && touched.model ? (
                  <div className="text-red-400">{errors.model}</div>
                ) : null}

                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Vehicle registration
                  <Field 
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 focus:border-purple-200"
                    name="vehicle_registration" 

                  />
                </label>
                {errors.vehicle_registration && touched.vehicle_registration ? (
                  <div className="text-red-400">{errors.vehicle_registration}</div>
                ) : null}
                

                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Colour
                  <Field 
                    className="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 w-full focus:border-purple-200"
                    name="color" 
                  />
                </label>
                {errors.color && touched.color ? (
                  <div className="text-red-400">{errors.color}</div>
                ) : null }

                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Year
                  <Field 
                    className="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 w-full focus:border-purple-200"
                    name="year" 
                  />
                </label>
                {errors.year && touched.year ? (
                  <div className="text-red-400">{errors.year}</div>
                ) : null }

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

export default ModalCar;
