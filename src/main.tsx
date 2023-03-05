import './sass/main.scss';
import React from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Layaout from './containers/Layout';
import Home from './views/Home';
import CountryDetail from './views/CountryDetail';

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to='/home' replace />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/home/:country/details',
    element: <CountryDetail />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layaout>
      <RouterProvider router={router} />
    </Layaout>
  </React.StrictMode>,
);