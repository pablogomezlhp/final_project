import React, {useCallback, useEffect, useState, useRef} from 'react';
import stripe from 'tipsi-stripe';

import {View, Text, Alert, TextInput, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Form} from '@unform/mobile';
import getValidationErrors from '../../utils/getValidationErrors';
// stripe.setOptions({
//   publishableKey: 'pk_test_Ni1yGhoLnPDkrOmZRPdu9Dye00eW7psDa6',
// });
import { Formik } from 'formik';
import CreditCardComponent from '../../components/CreditCard'

import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/Auth';
import {FormHandles} from '@unform/core';


import Button from '../../components/Button';
import Map from '../../components/Map';
import card from '../../assets/card.png';
import {
  Container,
  TextTitle,
  TextP,
  AddCarButton
} from './styles';
import api from '../../services/api';
import Input from '../../components/Input';
import { Title } from '../SignIn/styles';
import Menu from '../../components/Menu';
import Header from '../../components/Header';

export interface CarBaseProps {
  id: string;
  model: string;
  vehicle_registration: string;
  color: string;
  year: string;
  driver_id: string
}

const AddCredit
: React.FC = () => {
  const [cars, setCars] = useState<CarBaseProps[]>([]);
  const formRef = useRef<FormHandles>(null);

  const modelInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);
  const colorInputRef = useRef<TextInput>(null);
  const vehicleRegistrationInputRef = useRef<TextInput>(null);
  

  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect( () => {
    handleCars();
}, [])

const handleCars = useCallback(async ()=>{
    try {
        const result = await api.get('/cars');
        setCars(result?.data);
        console.log('deu certo',result)
    } catch (error) {
        console.log('deu erro',error)
    }
},[])


const handleSignUp = useCallback(() => {
  console.log('clicouuuuuu')
      //   return stripe
      //     .paymentRequestWithCardForm()
      //     .then((stripeTokenInfo: any) => {
      //       console.warn('Token created', { stripeTokenInfo });
      //     })
      //     .catch((error: any) => {
      //       console.warn('Payment failed', { error });
      //     });
       },[],
)
  return (
    <>
    <Header />
      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            {/* <Image source={card} /> */}

            <View>
              <TextP>Add Credit</TextP>
            </View>

            <CreditCardComponent/>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <Menu />
    </>
  );
};

export default AddCredit
;
