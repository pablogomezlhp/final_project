import styled from 'styled-components/native'; 

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    display: flex
    /* width: 100%; */
    height: 77%;
    background: #FCFCFC;
    justify-content: center;
    align-items: center;
`;
export const ContainerInfo = styled.View`
    display: flex
    justify-content:end
    flex-direction:row
    width: 90%
    height: 170px;
    background: #7467F0;
    elevation:10
    box-shadow: 2px 2px 2px #d7d7d9
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`;
export const TextInfo = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #FCFCFC;
    font-size: 28px
    width:180px
    margin-right:10px

`;
export const ContainerOption = styled.View`
    display: flex
    flex-direction:row
    width: 100%
    height: auto;
    justify-content: space-between;
    align-items: center;
    padding-left:22px;
    padding-right:22px;
    padding-top:20px
    box-shadow: 2px 2px 2px #d7d7d9
    
`;
export const CreditBox = styled.View`
    display: flex
    width: 47%
    height: 177px;
    background: #FCFCFC;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 2px 2px 2px #d7d7d9
`;
export const CreditCar = styled.View`
    display: flex
    width: 47%
    height: 177px;
    background: #FCFCFC;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    box-shadow: 2px 2px 2px #d7d7d9
    padding-top:35px
`;
export const CarTitle = styled.Text`
    color: #312e38;
    font-size: 22px
    font-weight:bold
`;
export const CarName = styled.Text`
    color: #312e38;
    font-size: 22px
    font-weight:bold
`;
export const CarButton = styled(RectButton)`
border-bottom-right-radius: 20px;
border-bottom-left-radius: 20px;
width: 100%
height: 60px;
color: #FCFCFC

justify-content: center;
align-items: center;
`;
  
export const ContainerCard = styled.View`
display: flex
flex-direction: column
width: 90%
height: 250px;

justify-content: space-between;
padding-left:1px
padding-right:1px
align-items: center;
border-radius: 20px;
margin-top:15px
box-shadow: 2px 2px 2px #d7d7d9
`;

export const AddCard = styled(RectButton)`
width: 60px
height: 130px;
background: #E6E4FD;
border-radius: 20px;
margin-top: 8px;
color: #FCFCFC

justify-content: center;
align-items: center;
`;
export const CardField = styled.View`

`;


export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 18px
`;
export const TitleText = styled.Text`
    margin-right:50%
    text-align: left
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 38px
    margin-bottom:20px

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
`;
export const CreditTitle = styled.Text`
    margin-top:30px
    color: #312e38;
    font-size: 22px
    font-weight:bold
`;
export const CreditValue = styled.Text`

    color: #312e38;
    font-size: 38px
`;
export const CreditButton = styled(RectButton)`
border-bottom-right-radius: 20px;
border-bottom-left-radius: 20px;
width: 100%
height: 60px;

margin-top: 20px;
color: #FCFCFC

justify-content: center;
align-items: center;
`;

export const TextOrderTitle = styled.Text`
    padding-top:8px
    font-family: 'RobotoSlab-Medium';
    color: #666666;
    font-size: 18px
`;
export const TextOrderMin = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 32px
    alignItems:flex-end
`;
export const TextStart = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 14px
`;
export const ViewOrderTime = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'RobotoSlab-Medium';
    color: #fff;
    font-size: 10px
    margin-top:-2
    padding-left: 50px
    padding-right: 30px
    padding-bottom:20px
`;
export const ViewMin = styled.View`
    display: flex;
    flex-direction: column;
    alignItems: center
    color: #fff;
    margin-top:-2
    padding-left: 30px
    padding-bottom:5px
`;
export const ContainerNotication = styled.View`
display: flex
flex-direction: column
width: 370px
height: 100px;
background: #EDF1F6;
justify-content: space-between;

align-items: center;
border-radius: 20px;
margin-top:20px
box-shadow: 2px 2px 2px #d7d7d9
`;
export const ViewRow = styled.View`
display: flex
flex-direction: row
justify-content: space-between;

`;
