import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Toast from '../../Subcomponents/Toast/Toast';

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
    return (
      <div>
        <Toast />
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
            <div>
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                  className="form-control"
                  style={{ marginBottom: '0px', paddingBottom: '0px' }}
                />
              </label>
            </div>
            <div>
              <p
                style={{ fontSize: '10px' }}
                onClick={(event) => {
                  event.preventDefault();
                  this.props.dispatch({ type: 'SET_TO_FORGOT_MODE' });
                }}
              >
                I forgot my password
              </p>
            </div>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Log In"
              className="log-in btn btn-primary"
            />
          </div>
        </form>
        <center>
          <div>
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
          </div>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
