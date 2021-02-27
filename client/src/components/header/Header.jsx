import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import './Header.scss';

class Header extends React.Component {
  constructor() {
    super();
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  render() {
    return (
      <header className="header">
        <span className="header__logo">Fmail</span>
        <form className="header__search-form" onSubmit={this.onSubmit}>
          <Input fullWidth className="header__search-field" />
          <Button type="submit" variant="contained" color="primary">
            <SearchIcon />
          </Button>
        </form>
      </header>
    );
  }
}

export default Header;
