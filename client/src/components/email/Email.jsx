import React from 'react';
import fetchAbsolute from 'fetch-absolute';
import paths from '../../config/paths';
import EmailView from './EmailView';
import './email.scss';

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: {} };
  }

  fetchApi = fetchAbsolute(fetch)('http://localhost:5000');

  componentDidMount = async () => {
    try {
      const emailId = this.props.emailId;
      const response = await this.fetchApi(paths.api.email(emailId));
      const email = await response.json();
      const view = EmailView(email);
      this.setState({ email: view });
    } catch (error) {
      this.props.onError(error);
    }
  }

  render() {
    return (
      <div className="email">
        <h1 className="email__subject">{this.state.email.subject}</h1>
        <header className="email__header">
          <div>
            <h2 className="email__from">
              <span className="email__from-label">From:</span>
              {this.state.email.from}
            </h2>
            <h2 className="email__to">
              <span className="email__from-label">To:</span>
              {this.state.email.recipients}
            </h2>
          </div>
          <h2 className="email__timestamp">{this.state.email.timestamp}</h2>
        </header>
        <main
          dangerouslySetInnerHTML={{ __html: this.state.email.body }}
          className="email__content"
        />
      </div>
    );
  }
}

export default Email;