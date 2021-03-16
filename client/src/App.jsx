import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Components
import Header from './components/header/Header';
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
          <Route exact path={paths.root} render={() => <Inbox path={paths.api.inboxEmails} />} />
          <Route path={paths.emailTemplate} component={Email} />
          <Route path={paths.inbox} render={() => <Inbox path={paths.api.inboxEmails} />} />
          <Route path={paths.important} render={() => <Inbox path={paths.api.importantEmails} />} />
          <Route path={paths.sentMail} render={() => <Inbox path={paths.api.sentMailEmails} />} />
          <Route path={paths.drafts} render={() => <Inbox path={paths.api.draftsEmails} />} />
          <Route path={paths.spam} render={() => <Inbox path={paths.api.spamEmails} />} />
        </div>
        <Alert title={alertTitle} open={showAlert} text={alertText} />
      </div>
    </BrowserRouter>
  );
}

export default App;
