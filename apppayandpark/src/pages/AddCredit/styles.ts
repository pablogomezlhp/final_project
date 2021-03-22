import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container =styled.View`
    /* width: 100%; */
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #FCFCFC;
    justify-content: space-between;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 18px
`;
export const TextTitle = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #7467F0;
    font-size: 18px
`;
export const TextP = styled.Text`
margin-right:50%
text-align: left
font-family: 'RobotoSlab-Medium';
color: #312e38;
font-size: 38px
`;
export const AddCarButton = styled(RectButton)`
/* width: 100%; */
    height: 60px;
    background: #ff9000;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
`;