import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Components
import Header from './components/header/HeaderContainer';
import NavigationBar from './components/navigationBar/NavigationBarContainer';
import Inbox from './components/inbox/InboxContainer';
import Alert from './components/alert/AlertContainer';
import Email from './components/email/EmailContainer';
import UtilityBar from './components/utilityBar/UtilityBarContainer';
// Styles
import './App.scss';
import './global.scss';
// Config
import paths from './config/paths';

const App = ({ alertTitle, showAlert, alertText }) => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <UtilityBar />
        <div className="content">
          <NavigationBar />
          <Route exact path={paths.root} component={Inbox} />
          <Route path={paths.emailTemplate} component={Email} />
          <Route path={paths.inbox} component={Inbox} />
          <Route path={paths.important} component={Inbox} />
          <Route path={paths.searchTemplate} component={Inbox} />
          <Route path={paths.sentMail} component={Inbox} />
          <Route path={paths.drafts} component={Inbox} />
          <Route path={paths.spam} component={Inbox} />
        </div>
        <Alert title={alertTitle} open={showAlert} text={alertText} />
      </div>
    </BrowserRouter>
  );
}

export default App;
