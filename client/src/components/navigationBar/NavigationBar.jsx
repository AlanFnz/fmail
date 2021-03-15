import React from 'react';
import Button from '@material-ui/core/Button';
import NavigationList from './components/navigationList/NavigationListContainer';
import ComposeEmail from './components/composeEmail/ComposeEmailContainer';
import './navigationBar.scss';

const NavigationBar = ({ onCompose }) => {
  return (
    <aside className="navigation-bar">
      <Button
        className="navigation-bar__compose-button"
        variant="contained"
        color="secondary"
        onClick={onCompose}
      >
        Compose
      </Button>
      <NavigationList />
      <ComposeEmail />
    </aside>
  );
};

export default NavigationBar;
