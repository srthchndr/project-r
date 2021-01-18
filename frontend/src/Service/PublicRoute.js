import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './Auth-service';

export const PublicRoute = ({ component: Component, ...rest }) => {
  console.log(rest)
  return (
    <Route
      {...rest}
      render={() => {
        if (!AuthService.getCurrentUserToken()) {
          return <Component {...rest} />;
        } else {
          return <Redirect to='/' />;
        }
      }}
    />
  );
};
