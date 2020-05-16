import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

// import './App.css';
import 'toastr/build/toastr.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './bootstrap.min.css';
import './toastr.min.css';

// SUBCOMPONENTS
import Nav from '../Subcomponents/Nav/Nav';
import Footer from '../Subcomponents/Footer/Footer';
import ProtectedRoute from '../Subcomponents/ProtectedRoute/ProtectedRoute';

// REDUX HELPERS
import mapStoreToProps from '../../redux/mapStoreToProps';

// ROUTE ENUMS
import ROUTE_ENUM from '../../constants/RouteEnum';

// PAGES
import AdminPage from '../Pages/AdminPage/AdminPage';
import AboutPage from '../Pages/AboutPage/AboutPage';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage/ForgotPasswordPage';
import LandingPage from '../Pages/LandingPage/LandingPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import ReportPage from '../Pages/ReportPage/ReportPage';
import UserPage from '../Pages/UserPage/UserPage';
import ResetPasswordPage from '../Pages/ResetPasswordPage/ResetPasswordPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="container">
            <Switch>
              <Redirect exact from="/" to={ROUTE_ENUM.HOME} />

              <Route exact path={ROUTE_ENUM.HOME} component={LandingPage} />
              <Route exact path={ROUTE_ENUM.ABOUT} component={AboutPage} />
              <Route
                exact
                path={ROUTE_ENUM.FORGOT}
                component={ForgotPasswordPage}
              />
              <Route
                exact
                path={ROUTE_ENUM.PASSWORD_RESET}
                component={ResetPasswordPage}
              />
              <ProtectedRoute
                exact
                path={ROUTE_ENUM.USER}
                component={UserPage}
              />
              {this.props.user.role === 'admin' && (
                <ProtectedRoute
                  exact
                  path={ROUTE_ENUM.ADMIN}
                  component={AdminPage}
                />
              )}
              <ProtectedRoute
                exact
                path={ROUTE_ENUM.LOGIN}
                authRedirect={ROUTE_ENUM.USER}
                component={LoginPage}
              />
              <ProtectedRoute
                exact
                path={ROUTE_ENUM.REGISTRATION}
                authRedirect={ROUTE_ENUM.USER}
                component={RegisterPage}
              />
              <ProtectedRoute
                exact
                path={ROUTE_ENUM.REPORT}
                component={ReportPage}
              />
              <Route
                render={() => (
                  <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1>404</h1>
                    <p>Page not found.</p>
                  </div>
                )}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect(mapStoreToProps)(App);
