import React from 'react';
import paths from '../../../../config/paths';
import setEmailToImportantRequest from './setEmailToImportantRequest';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import fetchAbsolute from 'fetch-absolute';

class InboxRowIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isImportant: props.isImportant };
  };

  fetchApi = fetchAbsolute(fetch)('http://localhost:5000');

  componentWillReceiveProps(nextProps) {
    this.setState({ isImportant: nextProps.isImportant });
  }
 
  onClick = async () => {
    const isImportant = !this.state.isImportant;
    this.setState({ isImportant });
    const request = setEmailToImportantRequest(isImportant);
    const path = paths.api.setEmailToImportant(this.props.emailId);
    await this.fetchApi(path, request);
  }
  
  render() {
    
    return (
      <div>
        <IconButton onClick={this.onClick}>
          {this.state.isImportant
            ? <StarIcon className="inbox__star" />
            : <StarBorderIcon />}
        </IconButton>
      </div>
    );
  }
}

export default InboxRowIcons;
