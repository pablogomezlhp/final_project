import React, { useCallback, useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/Feather';

import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Alert, Modal, Pressable, TextInput } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Button from '../Button'
import MenuButton from '../MenuButton'


import { Container, Container1, ButtonText, ButtonContainer } from './styles';
import { useNavigation } from '@react-navigation/core';
import Menu from '../Menu';
import Header from '../Header';
import api from '../../services/api';
import { onChange } from 'react-native-reanimated';
import markerImg from '../../assets/marker.png';
import { useAuth } from '../../hooks/Auth';


// interface ButtonPros extends RectButtonProperties { 
//     children: string;
// }

const Map: React.FC = () => {
  const [longitude, setLongitude] = useState(-6.25617);
  const [latitude, setLatitude] = useState(53.34317);
  const [modalVisible, setModalVisible] = useState(false);
  const [cars, setCars] = useState()
  const [credits, setCredits] = useState();
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    // getCurrentPosition();
    handleCar()
    handleCredit();
    findCoordinates()
  }, []);

  const handleCredit = useCallback(async () => {
    try {
      const result = await api.get('/credits');
      // const total = result.data.map((item => {
      //   return item.balance
      // }))
      // const newBalance = total.reduce((a, b) => a + b, 0);
      // setCredits(newBalance);

      const balances = result?.data 
      const total = result.data.map((item =>{
        return item.balance
      }))
      const newBalance = total.reduce((a, b) => a + b, 0); 
      const neww = balances.slice(-1);
      setCredits(neww[0].balance);
    } catch (error) {
      console.log(error)
    }
  }, [])

  const findCoordinates = useCallback(() => {
    // navigator.geolocation.getCurrentPosition(
    //     position => {
    //         const location = JSON.stringify(position);

    //         this.setState({ location });
    //     },
    //     error => Alert.alert(error.message),
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },[]
    // );
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
        setLongitude(+currentLongitude)
        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);
        setLatitude(+currentLatitude)
        console.log('qwwqqwq', currentLatitude, currentLongitude)


      }, (error) => alert(error.message), {
      enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    }
    );
  }, [])
  const handleCar = useCallback(async () => {
    try {
      const result = await api.get('/cars');
      setCars(result?.data);
      if (result.data[0].color) {
        setCars(result.data[0]);
      }
      console.log('CARRO', result)
    } catch (error) {
      console.log('deu erro', error)
    }
  }, [])
  


  const PaymentModal = () => {
    const [text, onChangeText] = useState()
    const [total, setTotal] = useState(0)
    
    const handleTotal = useCallback((e) => {
      console.log('easasasa',e)
      // const newvalue = (+text) * 0.25
      onChangeText(e)
      setTotal(e * 0.25)
    }, [])

    const handlePayment = useCallback(async () => {
      const data ={
        latitude,
        longitude,
        car_id: cars.id,
        duration: text,
        price: total
      }
      console.log('dtadatda', data)
      try {

        if(total > credits) {
          Alert.alert(`Error: You do not have enough balance.`,'Go to wallet and add more credits');
          return
        }
        const result = await api.post('/orders',data);
        const teste = await api.put(`/credits/${user.id}`, {
          balance: (+credits) - (+total),
          isPaid: true
        });
        console.log('RESULTADO', teste)
        Alert.alert(`Success: You can be parked for ${text} min`,`car:${cars.model}`, `registration:${cars.vehicle_registration}`);
        navigation.goBack();
      } catch (error) {
        Alert.alert('caiu no erro', error);
        
      }
    },[total, text])
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}

        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          {/* <Button onPress={()=>setModalVisible(false)}>Close</Button> */}
          <Icon onPress={()=>setModalVisible(false)} name="x-circle" size={32} color="#999" />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>How many minutes do you need?</Text>
            <Text style={styles.modalTextInfo}>€:0,25 per minute</Text>
            <TextInput
              style={[styles.input]}
              placeholder="enter the minutes"
            onChangeText={(e)=>handleTotal(e)}
            ></TextInput>           
            <>
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={() => handlePayment()}
            >
            
              <Text style={styles.textStyle}>Pay with {total} credits</Text>
            </Button>
            </>
          </View>
        </View>
      </Modal>
    )
  }
  return (
    <Container>
      <Header />
      <PaymentModal />
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 53.34317,
            longitude: -6.25617,
          }}
          image={require("../../assets/localizacao.png")}
          title={cars?.model}
          description={cars?.vehicle_registration}
        />
      </MapView>
      <Container1>
      <Button onPress={() => setModalVisible(true)}>PARK</Button>

      </Container1>


    </Container>
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
  },
  modalView: {
    width: 400,
    height: 400,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000000000000
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button: {
    marginTop:80,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#7467F0"
  },
  input:{
    color: "#7467F0",
    width:150,
    borderRadius:10,
    height:60,
    paddingTop:10,
    paddingBottom:10,
    borderColor: "#7467F0",
    borderWidth:2,
    fontSize: 16,
    textAlign: "center"
  },
  buttonOpen: {
    backgroundColor: "#7467F0",
  },
  buttonClose: {
    backgroundColor: "#7467F0",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:28,
    fontWeight:"bold",
    color:"#7467F0",
  },
  modalTextInfo: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:16,
  }
});

export default Map;

