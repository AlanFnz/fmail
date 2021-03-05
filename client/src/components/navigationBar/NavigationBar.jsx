import React from 'react';
import Button from '@material-ui/core/Button';
import NavigationList from './components/navigationList/NavigationList';
import './navigationBar.scss';
import ComposeEmail from './components/composeEmail/ComposeEmail';
import ComposeEmailOutcomeAlert from './components/composeEmail/ComposeEmailOutcomeAlert';
import SendEmailRequest from './components/composeEmail/utils/SendEmailRequest';

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      composeEmailOpen: false,
      errorAlertOpen: false,
      successAlertOpen: false,
      errorMessage: 'Something went wrong!'
    };
  };

  onSuccessAlertClose = () => {
    this.setState({ successAlertOpen: false })
  }

  onErrorAlertClose = () => {
    this.setState({ errorAlertOpen: false })
  }

  onCancel = () => {
    this.setState({ composeEmailOpen: false })
  }

  onCompose = (event) => {
    event.preventDefault();
    alert('onCompose');
  }

  onSend = async (event) => {
    event.preventDefault();
    const recipients = event.target.recipients.value;
    const subject = event.target.subject.value;
    const message = event.target.message.value;
    const request = SendEmailRequest(recipients, subject, message);
    try {
      const response = await fetch('http://localhost:5000/emails', request);
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
      }
      this.setState({ composeEmailOpen: false, successAlertOpen: true });
    } catch (error) {
      this.setState({
        composeEmailOpen: false,
        errorAlertOpen: true,
        errorMessage: error.message
      });
    };
  };

  onCompose = () => {
    this.setState({ composeEmailOpen: true });
  };

  render () {
    return (
      <aside className='navigation-bar'>
        <Button
          data-test='navigation-bar__compose'
          className='navigation-bar__compose-button'
          variant='contained'
          color='secondary'
          onClick={this.onCompose}
        >
          Compose
        </Button>
        <NavigationList />
        <ComposeEmail
          open={this.state.composeEmailOpen}
          onCancel={this.onCancel}
          onSend={this.onSend}
        />
        <ComposeEmailOutcomeAlert
          errorAlertOpen={this.state.errorAlertOpen}
          errorMessage={this.state.errorMessage}
          onErrorAlertClose={this.onErrorAlertClose}
          successAlertOpen={this.state.successAlertOpen}
          onSuccessAlertClose={this.onSuccessAlertClose}
        />
      </aside>
    );
  }
};

export default NavigationBar;
