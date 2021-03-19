import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import './utilityBar.scss';

class UtilityBar extends React.Component {
  constructor(props) {
    super(props);
  };

  onPrevious = () => {
    this.props.onPrevious(this.props.rangeStart, this.props.pathname);
  };

  onNext = () => {
    this.props.onNext(
      this.props.rangeStart,
      this.props.totalEmails,
      this.props.pathname
    );
  };

  render() {
    return (
      <div className="utility-bar">
        <div className="utility-bar__pagination">
          <div className="utility-bar__pagination-numbers">
            <strong>
              {this.props.rangeStart} - {this.props.rangeEnd}
            </strong>
            <span> of </span>
            <strong>{this.props.totalEmails}</strong>
          </div>
          <IconButton onClick={this.onPrevious}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={this.onNext}>
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default UtilityBar;
