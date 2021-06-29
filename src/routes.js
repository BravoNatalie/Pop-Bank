import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route component={Home} path="/" exact/>
      <Route component={Dashboard} path="/dashboard" />
    </BrowserRouter>
  );
}

export default Routes;