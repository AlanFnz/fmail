import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// Components
import Header from "./components/header/Header";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Inbox from "./components/inbox/Inbox";
// Styles
import "./App.scss";
import "./global.scss";
// Config
import paths from './config/paths';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="content">
          <NavigationBar />
          <Route exact path={paths.root} component={Inbox} />
          <Route path={paths.inbox} component={Inbox} />
          <Route path={paths.important} component={Inbox} />
          <Route path={paths.sentMail} component={Inbox} />
          <Route path={paths.drafts} component={Inbox} />
          <Route path={paths.spam} component={Inbox} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
