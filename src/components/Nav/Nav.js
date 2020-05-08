import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/home',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div>
      <div
        style={{
          margin: '0 auto',
          backgroundColor: '#131313',
          textAlign: 'center',
        }}
      >
        <h2 className="nav-title">
          <i className="fas fa-camera-retro" style={{ marginRight: '6px' }}></i>{' '}
          PRIME PHOTO CHALLENGE
        </h2>
      </div>
      {props.user && props.user.id && (
        <div className="nav">
          <div className="nav-center">
            <Link className="nav-link" to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>
            {props.store.user.role === 'admin' && (
              <>
                <Link className="nav-link" to="/admin">
                  Admin Page
                </Link>
              </>
            )}
            <Link className="nav-link" to="/report">
              Report
            </Link>
            {props.store.user.role === 'user' && (
              <>
                <Link className="nav-link" to="/about">
                  Rules
                </Link>
              </>
            )}
            <Link
              className="nav-link"
              to="/"
              onClick={() => props.dispatch({ type: 'LOGOUT' })}
            >
              Log Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
