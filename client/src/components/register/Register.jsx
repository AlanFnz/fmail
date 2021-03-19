import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'register.css';

const Register = ({ onSubmit, history }) => {
  return (
    <div className="register">
      <h1 className="register__h1">Register for fmail</h1>
      <form
        className="register__form"
        onSubmit={(event) => onSubmit(event, history)}
      >
        <TextField type="email" required name="email" label="Email" />
        <TextField type="password" required name="password" label="Password" />
        <TextField
          type="password"
          required
          name="confirmation"
          label="Confirm password"
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default withRouter(Register);
