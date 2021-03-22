import React from 'react';
import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps,
    Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
    roleId?: number;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, roleId, ...rest }) => {
    const { user } = useAuth();
    return (
        <ReactDOMRoute 
            {...rest}
            render={({ location }) => {
                return (isPrivate === !!user && roleId === user?.roleId) ? (
                    <Component />
                ) : (
                    <Redirect 
                        to={{ 
                            pathname: isPrivate ? '/signin' : user.roleId === 1 ? '/dashboard' : '/agent/dashboard',
                            state: { from: location }
                        }} 
                    />
                )
            }}
        />
    );
}

export default Route;