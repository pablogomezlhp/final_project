import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons';
import { Container, ButtonText } from './styles';

interface ButtonPros extends RectButtonProperties {
    children: string;
}

const MenuButton: React.FC<ButtonPros> = ({ children, ...rest }) => {
    return (
        <Container {...rest}>
            <ButtonText>
                {children}
            </ButtonText>
        </Container>
    );
};

export default MenuButton;