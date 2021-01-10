import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './Auth-service';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (AuthService.getCurrentUserToken()) {
          return <Component {...props} />;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};
