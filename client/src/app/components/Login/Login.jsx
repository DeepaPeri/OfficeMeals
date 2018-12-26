import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';
import { post, get } from '../../util/http.service';

class Login extends Component {
  successCB(response) {
    post('/api/auth/google-login', JSON.stringify(response.profileObj)).then(
      data => {
        if (data.status === 200) {
          sessionStorage.setItem('sessionID', data.data.sessionID);
          sessionStorage.setItem('userData', JSON.stringify(data.data.user));
          window.location.reload();
        } else {
          alert(data.msg);
        }
      }
    );
  }

  failureCB(response) {
    // alert("something went wrong!!")
  }

  handleLogout(e) {
    get('/api/auth/google-logout').then(() => {
      sessionStorage.removeItem('sessionID');
      sessionStorage.removeItem('userData');
      window.location.reload();
    });
  }

  getClientId() {
    const env = process.env.NODE_ENV;
    const config = {
      development:
        '1007995560664-p1u3icnpn86qdbbrjj136hi7o48311n1.apps.googleusercontent.com'
    };
    return config[env];
  }

  getWelcomeString() {
    const sessionId = sessionStorage.getItem('sessionID');
    let userData = sessionStorage.getItem('userData');
    let welcomeString = '';
    if (sessionId && userData) {
      userData = JSON.parse(userData);
      welcomeString = (
        <span>
          Hello {userData.name.givenName} {userData.name.familyName} &nbsp;
          <Button
            variant="contained"
            color="secondary"
            className="btn"
            onClick={this.handleLogout}
          >
            Logout
          </Button>
        </span>
      );
    } else {
      welcomeString = (
        <GoogleLogin
          clientId={this.getClientId()}
          buttonText="Login"
          onSuccess={this.successCB}
          onFailure={this.failureCB}
          className="btn"
        />
      );
    }
    return welcomeString;
  }

  render() {
    return this.getWelcomeString();
  }
}

export default Login;
