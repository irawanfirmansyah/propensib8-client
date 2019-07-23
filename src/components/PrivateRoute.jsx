import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN, USER_ROLE } from '../constants';

export const PrivateRoute = ({ component: Component, roles, onClick, ...rest }) => (
    <Route {...rest} render={props => {
        let currentUser = localStorage.getItem(ACCESS_TOKEN);
        let role = localStorage.getItem(USER_ROLE);

        if (!currentUser) {
            console.log('not logged in')
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        if (roles && roles.indexOf(role) === -1
            && role === 'ROLE_USER') {
            return <Redirect to={{ pathname: '/' }} />
        }
        if (roles && roles.indexOf(role) === -1
            && role === 'ROLE_ADMIN') {
            return <Redirect to={{ pathname: '/admin' }} />
        }
        if (roles && roles.indexOf(role) === -1
            && role === 'ROLE_CS') {
            return <Redirect to={{ pathname: '/overview' }} />
        }
        return <Component {...props} onClick={onClick} />
    }} />
)