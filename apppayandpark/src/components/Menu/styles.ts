import styled from 'styled-components/native'; 

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    /* width: 100%; */
    height: auto;
    background: #ff9000;
    border-radius: 10px;
    margin-top: 8px;

    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 18px
`;
export const ButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'RobotoSlab-Medium';
    color: #fff;
    font-size: 18px
    background-color: #FCFCFC
    padding-left: 30px
    padding-right: 30px
    padding-bottom:10px
    
`;
export const MenuButtonPark = styled(RectButton)`
    widht:10px
    font-family: 'RobotoSlab-Medium';
    color: #FCFCFC;
    font-size: 18px
    background-color:#FCFCFC
`;;