import React, {useState, useCallback, useEffect} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native'
import LottieView from 'lottie-react-native'
import CreditCardForm, { Button, FormModel } from 'rn-credit-card'
import Input from '../Input'
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/Auth'
import{InputContainer,
    TextInfo,
    ButtonConfirm} from './styles';


const CreditCardComponent: React.FC = () => {
    // const [creditValue, setCreditValue] = useState(0);
    const [number, onChangeNumber] = React.useState(null);
    const[credits, setCredits] = useState()
  const navigation = useNavigation();
  const { user } = useAuth();
  useEffect(() => {
    handleCredit()
  },[])

  const formMethods = useForm<FormModel>({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  })
  const { handleSubmit, formState } = formMethods
  const handleCredit = useCallback(async () => {
    try {
      const result = await api.get('/credits');
      const balances = result?.data 
      const total = result.data.map((item =>{
        return item.balance
      }))
      const newBalance = total.reduce((a, b) => a + b, 0); 
      const neww = balances.slice(-1);
      setCredits(neww[0].balance);
    } catch (error) {
      console.log(error)
    }
  }, [])
  async function onSubmit(model: FormModel) {
      const balance = +credits + +number;
      console.log('balance', balance)
    try {
        const result = await api.post(`/credits`, {balance});
        console.log('deu certo',result)
        Alert.alert(`Success: You have Added ${balance} to your Wallet`)
        navigation.goBack();
    } catch (error) {
        console.log('deu erro',error)
    }
  }

  return (
    <FormProvider {...formMethods}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.avoider}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <InputContainer>
            <TextInfo>Credit Value to add:
            </TextInfo>
            <TextInput
                // autoCapitalize="words"
                style={{
                    fontSize:24,
                    color:'£7467F0',
                    width:40,
                }}
                placeholder="Value"
                returnKeyType="next"
                onChangeText={onChangeNumber}
                keyboardType="numeric"

              />
            </InputContainer>
          <CreditCardForm
            LottieView={LottieView}
            horizontalStart
            overrides={{
              labelText: {
                marginTop: 16,
              },
            }}
            fonts={{
                regular: 'arial',
                bold: 'arial',
              }}
          />
        </KeyboardAvoidingView>
        {formState.isValid && (
          <Button
            style={styles.button}
            title={`CONFIRM € ${number}`}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </SafeAreaView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
})

export default CreditCardComponent