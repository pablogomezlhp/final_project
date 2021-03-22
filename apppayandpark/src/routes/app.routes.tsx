import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Payment from '../pages/Payment';
import Profile from '../pages/Profile';
import MyCar from '../pages/MyCar';
import AddCar from '../pages/AddCar';
import Wallet from '../pages/Wallet';
import AddCredit from '../pages/AddCredit';
import Park from '../pages/Park';
// import CreateAppointment from '../pages/CreateAppointment';
// import AppointmentCreated from '../pages/AppointmentCreated';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#312e38'},
    }}>
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Payment" component={Payment} />
    <App.Screen name="MyCar" component={MyCar} />
    <App.Screen name="AddCar" component={AddCar} />
    <App.Screen name="Wallet" component={Wallet} />
    <App.Screen name="AddCredit" component={AddCredit} />
    <App.Screen name="Park" component={Park} /> 
    {/* <App.Screen name="CreateAppointment" component={CreateAppointment} />
        <App.Screen name="AppointmentCreated" component={AppointmentCreated} /> */}

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;
