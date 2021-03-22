import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';


import Button from '../../components/Button';
import Map from '../../components/Map';

import {
  Container,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);


  const {navigate} = useNavigation();

  // console.log('user', user);


  const navigateToProfile = useCallback(() => {
    // signOut();
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', {providerId});
    },
    [navigate],
  );

  return (
    <View>
        <Text>pablo</Text>
    </View>
  );
};

export default Dashboard;
