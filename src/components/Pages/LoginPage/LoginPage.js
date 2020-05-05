import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import toastr from 'toastr';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    if (this.props.store.errors.loginMessage === 'LOGIN_FAILED') {
      toastr['error']('Login Incorrect');
      this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' });
    }

    if (this.props.store.errors.loginMessage === 'LOGIN_INPUT_ERROR') {
      toastr['error']('Missing Inputs');
      this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' });
    }

    if (this.props.store.errors.loginMessage === 'LOGIN_FAILED_NO_CODE') {
      toastr['error']('Opps! Something is wrong!');
      this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' });
    }

    return (
      <div>
        <form
          className="form-group"
          onSubmit={this.login}
          style={{ textAlign: 'center' }}
        >
          <h1>Login</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                className="form-control"
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                className="form-control"
              />
            </label>
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
              className="btn btn-primary"
            />
          </div>
        </form>
        <center>
          <p>No account?</p>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' });
            }}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
