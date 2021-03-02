import React from 'react';
import Button from '@material-ui/core/Button';
import NavigationList from './components/navigationList/NavigationList';
import './navigationBar.scss';

class NavigationBar extends React.Component {

  onCompose = (event) => {
    event.preventDefault();
    alert('onCompose');
  }

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
      </aside>
    );
  }
};

export default NavigationBar;
