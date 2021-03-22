import React from 'react';
import { Switch } from 'react-router-dom';

import Route from  './Route'

import SignIn from '../pages/SignIn';
import Landing from '../pages/index';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import MyCar from '../pages/MyCar';
import MyWallet from '../pages/MyWallet';
import History from '../pages/History';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';

import AgentDashboard from '../pages/Agent/Dashboard';


const Routes: React.FC = () => (
  

    <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />

        <Route path="/dashboard" component={Dashboard} isPrivate roleId={1} />
        <Route path="/mycar" component={MyCar} isPrivate roleId={1} />
        <Route path="/mywallet" component={MyWallet} isPrivate roleId={1} />
        <Route path="/history" component={History} isPrivate roleId={1} />
        <Route path="/settings" component={Settings} isPrivate roleId={1} />
        <Route path="/profile" component={Profile} isPrivate roleId={1} />

        <Route path="/agent/dashboard" component={AgentDashboard} isPrivate roleId={2} />

    </Switch>
);

export default Routes;