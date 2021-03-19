import React from 'react';
import Paths from '../../config/paths';
import Header from '../header/HeaderContainer';
import NavigationBar from '../navigationBar/NavigationBarContainer';
import Route from 'react-router-dom/Route';
import Inbox from '../inbox/InboxContainer';
import Email from '../email/EmailContainer';
import UtilityBar from '../utilityBar/UtilityBarContainer';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  async componentDidMount() {
    const options = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(Paths.api.isLoggedIn, options);

    if (!response.ok && response.status === 401) {
      this.props.history.push(Paths.register); //TODO: change to login when login page is done
    } else {
      this.setState({ show: true });
    }
  }

  render() {
    if (this.state.show) {
      return (
        <div>
          <Header />
          <UtilityBar />
          <div className="content">
            <NavigationBar />
            <Route exact path={Paths.root} component={Inbox} />
            <Route path={Paths.emailTemplate} component={Email} />
            <Route path={Paths.inbox} component={Inbox} />
            <Route path={Paths.important} component={Inbox} />
            <Route path={Paths.searchTemplate} component={Inbox} />
            <Route path={Paths.sentMail} component={Inbox} />
            <Route path={Paths.drafts} component={Inbox} />
            <Route path={Paths.spam} component={Inbox} />
          </div>
        </div>
      );
    } else {
      return null; //TODO: add a loading screen?
    }
  }
}

export default AppComponent;
