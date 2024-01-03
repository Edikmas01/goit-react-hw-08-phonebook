import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = () => {
  return (
    <div className={css.container}>
      <NavLink className={css.register} to="/register">
        Register
      </NavLink>
      <NavLink className={css.logIn} to="/login">
        Log In
      </NavLink>
    </div>
  );
};
