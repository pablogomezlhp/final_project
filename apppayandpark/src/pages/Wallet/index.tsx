import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Alert, Image} from 'react-native';
import { Card, ListItem } from 'react-native-elements'

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import credit from '../../assets/credit.png'


import Button from '../../components/Button';
import Map from '../../components/Map';

import {
  Container,
  TextTitle,
  CreditBox,
  TextP,
  AddCarButton
} from './styles';
import api from '../../services/api';
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

const Wallet
: React.FC = () => {
  const [credits, setCredits] = useState();


  const navigation = useNavigation();

  // console.log('user', user);
  useEffect( () => {
    handleCredit();
}, []) 

const handleCredit = useCallback(async ()=>{
    try {
        const result = await api.get('/credits'); 
        const balances = result?.data 
        const total = result.data.map((item =>{
          return item.balance
        }))
        const newBalance = total.reduce((a, b) => a + b, 0); 
        const neww = balances.slice(-1);
        setCredits(neww[0].balance);
        console.log('deu certo',result.data)
    } catch (error) {
        console.log('deu erro',error)
    } 
},[])
console.log('pablo')
console.log('cars', credits)



//   const navigateToProfile = useCallback(() => {
//     // signOut();
//     navigate('Profile');
//   }, [navigate]);

//   const navigateToCreateAppointment = useCallback(
//     (providerId: string) => {
//       navigate('CreateAppointment', {providerId});
//     },
//     [navigate],
//   );

  return (
      <>
       <Header/>
    <Container>
        <TextTitle>My Wallet</TextTitle>
        <CreditBox>
        <Image source={credit} />
        </CreditBox>
        {!credits &&(
            <Text>You dont have credit.</Text>
        )}
         {credits !== 0 &&(
           <TextP>$ {credits}</TextP>
        )}
        <Button style={{width:200}} onPress={() => navigation.navigate('AddCredit')}>Add Credit</Button>
    </Container>
    <Menu />
    </>
    
  );
};

export default Wallet
;
