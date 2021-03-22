import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';


import Icon from 'react-native-vector-icons/Feather';

import { StyleSheet, View, Text, Dimensions, Image, ScrollView, } from 'react-native';
import Button from '../Button'
import MenuButton from '../MenuButton'
import logoImg from '../../assets/pack.png';
import carImg from '../../assets/carcard.png';

import { Container, ButtonText, ButtonContainer, TitleText, ContainerOption, CreditBox, ViewMin, CreditCar, ContainerInfo, ContainerCard, AddCard, CardField, TextInfo, CreditTitle, CreditValue, CreditButton, CarName, CarTitle, CarButton, ContainerNotication, TextOrderTitle, TextOrderMin, ViewOrderTime, TextStart, ViewRow } from './styles';
import api from '../../services/api';


const Overview: React.FC = () => {

  const [credits, setCredits] = useState();
  const [orders, setOrders] = useState([]);
  const [car, setCar] = useState();
  const navigation = useNavigation();


  useEffect(() => {
    handleCredit();
    handleCars();
    handleOrders();
  }, [])

  const handleCredit = useCallback(async () => {
    try {
      const result = await api.get('/credits');
      const balances = result?.data
      const total = result.data.map((item => {
        return item.balance
      }))
      const newBalance = total.reduce((a, b) => a + b, 0);
      const neww = balances.slice(-1);
      setCredits(neww[0].balance);
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleCars = useCallback(async () => {
    try {
      const result = await api.get('/cars');
      setCar(result?.data);
      // if(result.data[0].color){
      //     setDisplay(true);
      // }
      console.log('deu certo', result)
    } catch (error) {
      console.log('deu erro', error)
    }
  }, [])

  const handleOrders = useCallback(async () => {
    try {
      const result = await api.get('/orders');
      console.log('@orders', result?.data)
      setOrders(result?.data);

    } catch (error) {

    }
  }, [])

  return (
    <>
      <Container>
        <TitleText>Overview</TitleText>
        <ContainerInfo>
          <Image source={logoImg} />
          <TextInfo>Easily and quick to pay</TextInfo>
        </ContainerInfo>
        <ContainerOption>
          <CreditBox>
            <CreditTitle>Credits</CreditTitle>
            <CreditValue>€ {credits}</CreditValue>
            <CreditButton onPress={() => navigation.navigate('AddCredit')}>
              <Text>Add credit</Text></CreditButton>
          </CreditBox>
          <CreditCar>
            {/* <CarTitle>Car</CarTitle> */}
            {/* <CarName>BMW</CarName> */}
            <Image source={carImg} />
            <CarButton onPress={() => navigation.navigate('MyCar')}>
              <Text>Check more info</Text></CarButton>
          </CreditCar>
        </ContainerOption>

        <ContainerCard>
          {orders && (
            <ScrollView>
            {orders?.reverse().map((item, index) => {
              return(
                <View>
   
                
                <ContainerNotication>
                  <TextOrderTitle>Order number: {item?.order_number}</TextOrderTitle>
                  <ViewRow>
                    <ViewMin>
                      <TextOrderMin>
                        {item.price / 0.25}
                      </TextOrderMin>
                      <Text>min</Text>
                    </ViewMin>
                    <ViewOrderTime>
                      <TextStart>Starts:{format(new Date(item.reservation.start_reservation), 'dd/MM/yyyy HH:mm')}</TextStart>
                      <TextStart>End:{format(new Date(item.reservation.end_reservation), 'dd/MM/yyyy HH:mm')}</TextStart>
                    </ViewOrderTime>
                  </ViewRow>
   
                </ContainerNotication>
                </View>
              )
            })}
             
             </ScrollView>
          )}
          {!orders &&(
            <ContainerNotication>
            {/* <AddCard>
            <Text>+</Text>
          </AddCard> */}
            <CardField></CardField>
          </ContainerNotication>
          )}

        </ContainerCard>

      </Container>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '76%'
  }
});

export default Overview;