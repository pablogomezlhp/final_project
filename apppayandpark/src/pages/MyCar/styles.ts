import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container =styled.View`
    /* width: 100%; */
    height: 77%;
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
margin-top:20px
margin-right:50%
text-align: left
font-family: 'RobotoSlab-Medium';
color: #312e38;
font-size: 38px

`;
export const TextP = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #7467F0;
    font-size: 12px
`;
export const AddCarButton = styled(RectButton)`
/* width: 100%; */
    height: 60px;
    background: #ff9000;
    border-radius: 10px;
    margin-top: 8px;

    justify-content: center;
    align-items: center;
`;
export const Card1 =styled.View`
    width: 90%
    height: 200px;
    display: flex;
    padding:20px
    flex-direction: column;
    background: #FCFCFC;
    box-shadow: 2px 2px 2px #d7d7d9
    justify-content: space-between;
    align-items: center;
    margin-bottom:20px
`;
export const CardField =styled.View`
    width: 60%
    height: 30px;
    display: flex;
    flex-direction: row;
    background: #FCFCFC;

    justify-content: space-between;
    align-items: center;
`;
export const CardText1 = styled.Text`
    color: #7467F0;
    font-size: 18px
`;
export const CardText2 = styled.Text`
    color: #7467F0;
    font-size: 23px
    font-weight:bold
`;
export const CardField1 =styled.View`
    width: 60%
    height: 30px;
    display: flex;
    flex-direction: row;
    background: #FCFCFC;

    justify-content: flex-end;
    align-items: center;
`;