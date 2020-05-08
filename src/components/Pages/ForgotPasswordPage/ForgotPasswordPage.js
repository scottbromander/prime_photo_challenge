import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import toastr from 'toastr';
import { eventChannel } from 'redux-saga';

class ForgotPasswordPage extends Component {
  state = {
    email: '',
    forgotSent: false,
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    // if (this.props.store.errors.loginMessage === 'LOGIN_FAILED') {
    //   toastr['error']('Login Incorrect');
    //   this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' });
    // }

    return (
      <div>
        {this.state.forgotSent ? (
          <div style={{ textAlign: 'center' }}>
            <h3>An email is on the way!</h3>
            <hr />
            <p>An email was sent to your account.</p>
            <p>You will get directions on what to do from there.</p>
          </div>
        ) : (
          <div>
            <form
              className="form-group"
              onSubmit={this.login}
              style={{ textAlign: 'center' }}
            >
              <h1>Forgot Password?</h1>
              <p>
                Enter your email and we will send a link to reset your password.
              </p>
              <div>
                <label htmlFor="username">
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChangeFor('email')}
                    className="form-control"
                  />
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => {
                  event.preventDefault();
                  this.props.dispatch({
                    type: 'FORGOT_PASSWORD',
                    payload: {
                      email: this.state.email,
                    },
                  });
                  this.setState({
                    forgotSent: true,
                  });
                }}
              >
                Submit
              </button>
            </form>
            <center>
              <p>Suddenly Remember?</p>
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
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ForgotPasswordPage);
