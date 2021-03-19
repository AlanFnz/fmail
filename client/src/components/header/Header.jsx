import React from "react";
import { withRouter } from 'react-router-dom';
import paths from '../../config/paths';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (!event.target.search.value) return;

    this.props.onSubmit();

    if (window.location.pathname === paths.searchTemplate) {
      this.props.history.replace(paths.search(event.target.search.value));
    } else {
      this.props.history.push(paths.search(event.target.search.value));
    }
  };

  render() {
    return (
      <header className="header">
        <span className="header__logo">Fmail</span>
        <form className="header__search-form" onSubmit={this.onSubmit}>
          <Input fullWidth name="search" className="header__search-field" />
          <Button type="submit" variant="contained" color="primary">
            <SearchIcon />
          </Button>
        </form>
      </header>
    );
  }
}

export default withRouter(Header);
