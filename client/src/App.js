import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './app/Main';
import AppContainer from './app/pages/shared/AppContainer';
import './App.css';
import { UserContext, defaultUser } from './app/pages/shared/userContext';

class App extends Component {
  state = {
    user: defaultUser
  };

  componentWillMount() {
    this.setState(() => {
      const sessionId = sessionStorage.getItem('sessionID'); // eslint-disable-line no-undef
      const userData = sessionStorage.getItem('userData'); // eslint-disable-line no-undef
      const userDataObj = JSON.parse(userData);
      return { user: { sessionId, ...userDataObj } };
    });
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <UserContext.Provider value={user}>
          <AppContainer>
            <Main />
          </AppContainer>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
}

App.contextType = UserContext;

export default App;
