import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import Register from '../register/RegisterContainer';
import paths from '../../config/paths';
// Components
import Alert from './components/alert/AlertContainer';
import AppComponent from './AppComponent';
// Styles
import './App.scss';
import './global.scss';
// Config
import paths from './config/paths';

const App = ({ alertTitle, showAlert, alertText }) => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path={paths.register} component={Register} />
          <Route component={AppComponent} />
        </Switch>
        <Alert title={alertTitle} open={showAlert} text={alertText} />
      </div>
    </BrowserRouter>
  );
}

export default App;
