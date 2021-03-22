import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/Auth';


import { ButtonContainer} from './styles';
import MenuButton from '../MenuButton';
import Icon from 'react-native-vector-icons/Feather';

const Menu
: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  return (
    <ButtonContainer>
        <MenuButton onPress={() => navigation.navigate('Dashboard')}><Icon name="home" size={32} color="#999" /></MenuButton>
        <MenuButton onPress={() => navigation.navigate('MyCar')}><Icon name="truck" size={32} color="#999" /></MenuButton>
        <MenuButton onPress={() => navigation.navigate('Park')}><Icon name="map-pin" size={32} color="#7467F0" /></MenuButton>
        <MenuButton onPress={() => navigation.navigate('Wallet')}><Icon name="dollar-sign" size={32} color="#999" /></MenuButton>
    </ButtonContainer >
  );
};

export default Menu
;
