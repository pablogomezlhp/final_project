import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {FlatList} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const InputContainer = styled.View`
  display:flex
padding:60px
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextInfo = styled.Text`
  margin-left: 8px;
  font-size:16px
  color: #7467F0;
  font-family: 'RobotoSlab-Regular';
`;
export const ButtonConfirm = styled(RectButton)`
  background: #FCFCFC;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
`;
