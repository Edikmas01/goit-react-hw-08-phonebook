import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import App from './components/App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout.module';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
// import ContactsPage from 'pages/ContactsPage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../src/redux/store';
import { PrivateRoute } from 'components/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute';
import ContactsPage from 'pages/ContactsPage';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'register',
        element: (
          <RestrictedRoute
            component={<RegisterPage />}
            redirectTo="/contacts"
          />
        ),
      },
      {
        path: 'login',
        element: (
          <RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />
        ),
      },
      {
        path: 'contacts',
        element: <PrivateRoute redirectTo="/login" component={ <App/>} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
);
