import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

class InboxRowIcons extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  };

  
  onClick = async () => {
    alert(`Set ${this.props.emailId} to important`);
  }
  
  render() {
    return (
      <div>
        <IconButton onClick={this.onClick}>
          {this.props.isImportant
            ? <StarIcon className="inbox__star" />
            : <StarBorderIcon />}
        </IconButton>
      </div>
    );
  }
}

export default InboxRowIcons;
