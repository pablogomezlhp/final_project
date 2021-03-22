import React, {useCallback, useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/Auth';
import api from '../../services/api';

import Button from '../../components/Button';
import Map from '../../components/Map';
import Overview from '../../components/Overview';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';
import Menu from '../../components/Menu';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const {signOut, user} = useAuth();
  console.log({user});

  const {navigate} = useNavigation();

  // console.log('user', user);

  useEffect(() => {
      api.get('providers').then(response => {
          setProviders(response.data);

      })
  }, [])

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
    <Container>
      <Header>
        <HeaderTitle>
          Welcome, {'\n'}
          <UserName>{user.username}</UserName>
        </HeaderTitle>
        <Icon onPress={signOut} name="power" size={32} color="#ff9000" />
      </Header>
<>

      {/* <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={<ProvidersListTitle>Park now</ProvidersListTitle>}
        renderItem={({item: provider}) => (
         
          // <ProviderContainer
          //   onPress={() => navigateToCreateAppointment(provider.id)}>
          //   <ProviderAvatar source={{uri: provider.avatar_url}} />

          //   <ProviderInfo>
          //     <ProviderName>{provider.name}</ProviderName>

          //     <ProviderMeta>
          //       <Icon name="calendar" size={14} color={'#ff9000'} />
          //       <ProviderMetaText>Monday to friday</ProviderMetaText>
          //     </ProviderMeta>

          //     <ProviderMeta>
          //       <Icon name="clock" size={14} color={'#ff9000'} />
          //       <ProviderMetaText>8am to 6pm</ProviderMetaText>
          //     </ProviderMeta>
          //   </ProviderInfo>
          // </ProviderContainer>
        )}></ProvidersList> */}
         {/* <Map /> */}
         <Overview />
         <Menu/>
         </>

      {/* <Button onPress={signOut}>Sign out</Button> */}
      {/* <Button onPress={signOut}>Sign out</Button> */}

    </Container>
  );
};

export default Dashboard;


// {user.avatar_url === null ? (
//   <ProfileButton onPress={navigateToProfile}>
//     <UserName>{user.username}</UserName>
// <Button onPress={signOut}>Sign out</Button>

//   </ProfileButton>
// ) : (
//   <ProfileButton onPress={navigateToProfile}>
//     <UserAvatar source={{uri: user.avatar_url}} />

// {/* <Icon name="clock" size={14} color={'#ff9000'} /> */}
// <Icon onPress={signOut} name="power" size={32} color="#ff9000" />


//   </ProfileButton>
// )}