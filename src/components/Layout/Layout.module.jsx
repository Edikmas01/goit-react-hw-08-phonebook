import { Navigation } from '../Navigatiom';

import { UserMenu } from '../UserMenu';
import { AuthNav } from '../AuthNav';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { refreshUser } from 'redux/auth/operations';
import { useEffect } from 'react';

export const Layout = () => {

  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(refreshUser());
    }, [dispatch]);
  
  const isLoggedIn = useSelector(selectIsLoggedIn);


  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
      <header className={css.header}>
        <div className={css.headerContent}>
          <Navigation />
          <div className={css.rightCorner}>
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
