import React, {useCallback, useEffect, useState, useRef} from 'react';
import {View, Text, Alert, TextInput, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Form} from '@unform/mobile';
import getValidationErrors from '../../utils/getValidationErrors';

import { Formik } from 'formik';

import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/Auth';
import {FormHandles} from '@unform/core';


import Button from '../../components/Button';
import Map from '../../components/Map';
import car from '../../assets/car.png';
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

export interface CarBaseProps {
  id: string;
  model: string;
  vehicle_registration: string;
  color: string;
  year: string;
  driver_id: string
}

const AddCar
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

const handleSignUp = useCallback(
    async (data: any) => {
      try {
        const obj = {
            model: data.model,
            vehicle_registration: data.vehicle_registration,
            color: data.color,
            year: data.year,
            driver_id: user.id 
        }

        await api.post('/cars', obj);

        Alert.alert(
          'Car added successfully',
          'You can park now!!',
        );

        navigation.goBack();
      } catch (err) {
        Alert.alert('Registration error', 'Registration failure, try again');
      }
    },
    [],
  );
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <Image source={car} />

            <View>
              <Title>Add a car</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                // autoCapitalize="words"
                name="model"
                icon="alert-circle"
                placeholder="Model"
                returnKeyType="next"
                onSubmitEditing={() => {
                  modelInputRef.current?.focus();
                }}
              />

              <Input
                ref={yearInputRef}
                keyboardType="phone-pad"
                autoCorrect={false}
                autoCapitalize="none"
                name="year"
                icon="alert-circle"
                placeholder="year"
                returnKeyType="next"
                onSubmitEditing={() => {
                  yearInputRef.current?.focus();
                }}
              />

              <Input
                ref={colorInputRef}
                // keyboardType="color"
                autoCorrect={false}
                autoCapitalize="none"
                name="color"
                icon="alert-circle"
                placeholder=""
                returnKeyType="next"
                onSubmitEditing={() => {
                  colorInputRef.current?.focus();
                }}
              />

              <Input
                // textContentType="newPassword"
                ref={vehicleRegistrationInputRef}
                name="vehicle_registration"
                icon="alert-circle"
                placeholder="registration number"
                // secureTextEntry
                // returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
               Add
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <Menu />
    </>
  );
};

export default AddCar
;
