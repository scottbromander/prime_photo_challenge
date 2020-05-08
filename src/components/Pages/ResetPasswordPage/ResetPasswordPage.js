import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import toastr from 'toastr';

class ResetPasswordPage extends Component {
  state = {
    password: '',
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  componentDidUpdate() {
    if (this.props.store.resetReducer) {
      this.props.dispatch({ type: 'CLEAR_RESET' });
      this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' });
      this.props.history.push('/login');
    }
  }

  render() {
    // if (this.props.store.errors.loginMessage === 'LOGIN_FAILED') {
    //   toastr['error']('Login Incorrect');
    //   this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' });
    // }

    return (
      <div>
        <form
          className="form-group"
          onSubmit={this.login}
          style={{ textAlign: 'center' }}
        >
          <h1>Reset Password</h1>
          <div>
            <label htmlFor="username">
              New Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                className="form-control"
              />
            </label>
          </div>
        </form>
        <center>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              this.props.dispatch({
                type: 'RESET_PASSWORD',
                payload: {
                  ...this.props.match.params,
                  newPassword: this.state.password,
                },
              });
            }}
          >
            Submit
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ResetPasswordPage);
