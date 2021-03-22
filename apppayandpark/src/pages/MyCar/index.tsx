import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Alert, Image} from 'react-native';
import { Card, ListItem } from 'react-native-elements'

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';



import Button from '../../components/Button';
import Map from '../../components/Map';
import Header from '../../components/Header';

import mycar from '../../assets/mycar.png'

import {
  Container,
  TextTitle,
  TextP,
  AddCarButton,
  Card1,
  CardField,
  CardField1,
  CardText1,
  CardText2,
} from './styles';
import api from '../../services/api';
import Menu from '../../components/Menu';

export interface CarBaseProps {
  id: string;
  model: string;
  vehicle_registration: string;
  color: string;
  year: string;
  driver_id: string
}

const MyCar
: React.FC = () => {
  const [cars, setCars] = useState<CarBaseProps[]>();
  const [display, setDisplay] = useState(false);


  const navigation = useNavigation();

  // console.log('user', user);
  useEffect( () => {
    handleCars();
}, [cars])

const handleCars = useCallback(async ()=>{
    try {
        const result = await api.get('/cars');
        setCars(result?.data);
        if(result.data[0].color){
            setDisplay(true);
        }
        console.log('deu certo',result)
    } catch (error) {
        console.log('deu erro',error)
    }
},[])
console.log('pablo')
console.log('cars', cars)

const handleRemove = useCallback(async (id) =>{
    try {
        await api.delete(`/cars/${id}`);
        setDisplay(false);
        Alert.alert(
          'Car successfully removed',
        );

        navigation.goBack();
      } catch (err) {
          console.log(err,'carro erro')
        Alert.alert('Registration error', 'Registration failure, try again');
      }
},[])

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
        <TextTitle>My Car</TextTitle>
        <Image source={mycar} />
        {display === false &&(
        <TextP>You dont have car added.</TextP>
        )}

        { display === true &&(
            cars?.map((car, index)=> {

                return( <Card1>
                    <CardField>
                        <CardText1>Model:</CardText1>
                        <CardText2>{car.model}</CardText2>
                    </CardField>
                    <CardField>
                    <CardText1>Color:</CardText1>
                        <CardText2>{car.color}</CardText2>
                    </CardField>
                    <CardField>
                    <CardText1>Registration:</CardText1>
                        <CardText2>{car.vehicle_registration}</CardText2>
                    </CardField>
                    <CardField1> 
                    <Icon onPress={() => handleRemove(car.id)} name="trash-2" size={32} color="#ff9000" />
                    </CardField1>
                 </Card1>)
             })
        )}
       {display === false &&(
            <Button style={{width:200}} onPress={() => navigation.navigate('AddCar')}>Add a Car</Button>
       )}
    </Container>
          <Menu />
          </>
  );
};

export default MyCar
;
