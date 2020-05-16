import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import toastr from 'toastr';

// TODO: Probably should create a custom solution. Toastr uses jQuery... so...
class Toast extends Component {
  componentDidUpdate() {
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
  }

  render() {
    return <div></div>;
  }
}

export default connect(mapStoreToProps)(Toast);
