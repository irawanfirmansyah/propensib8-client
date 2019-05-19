import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN, USER_ROLE } from '../constants';
import isEmpty from 'lodash/isEmpty';

export const PrivateRoute = ({ component: Component, roles, onClick, ...rest }) => (
    <Route {...rest} render={props => {
        let currentUser = localStorage.getItem(ACCESS_TOKEN);
        let role = localStorage.getItem(USER_ROLE);

        if (!currentUser) {
            console.log('not logged in')
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(role) === -1
            && role === 'ROLE_USER') {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/' }} />
        }
        if (roles && roles.indexOf(role) === -1
            && role === 'ROLE_ADMIN') {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/admin' }} />
        }
        if (roles && roles.indexOf(role) === -1
            && role === 'ROLE_CS') {
                return <Redirect to={{ pathname: '/overview' }}/>
        }   
        // authorised so return component
        return <Component {...props} onClick={onClick} />
    }} />
)