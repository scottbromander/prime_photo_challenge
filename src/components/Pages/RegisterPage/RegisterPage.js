import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import toastr from 'toastr';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    if (this.props.store.errors.registrationMessage === 'REGISTRATION_FAILED') {
      toastr['error']('Registration Failed');
      this.props.dispatch({ type: 'CLEAR_REGISTRATION_ERROR' });
    }

    if (
      this.props.store.errors.registrationMessage === 'REGISTRATION_INPUT_ERROR'
    ) {
      toastr['error']('Input Missing');
      this.props.dispatch({ type: 'CLEAR_REGISTRATION_ERROR' });
    }

    return (
      <div>
        <form
          className="form-group"
          onSubmit={this.registerUser}
          style={{ textAlign: 'center' }}
        >
          <h1>Register User</h1>
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
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
                className="form-control"
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
              className="register btn btn-primary"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' });
            }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
