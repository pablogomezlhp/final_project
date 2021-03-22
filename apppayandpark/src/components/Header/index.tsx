import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/Auth';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

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

const Header1
: React.FC = () => {
    const {signOut, user} = useAuth();
  const navigation = useNavigation();
  return (
    <Header>
    <HeaderTitle>
      Welcome, {'\n'}
      <UserName>{user.username}</UserName>
    </HeaderTitle>
    <Icon onPress={signOut} name="log-out" size={32} color="#ff9000" />
    </Header>
  );
};

export default Header1
;





