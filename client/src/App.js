import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './app/Main';
import http from './app/util/http.service';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roles: [],
      canInitiateView: false
    };
  }

  /*async getCurrentUserRoles () {
    if (sessionStorage.getItem('sessionID')) {
      let myRolePromise = http.get('/api/users/get-my-roles')
        .then((res) => {
          return res.data.roles;
      });
      return await myRolePromise;
    } else {
      return [];
    }
  }*/
  componentDidMount () {
    if (sessionStorage.getItem('sessionID')) {
      http.get('/api/users/get-my-roles')
        .then((res) => {
          this.setState({ roles: res.data.roles , canInitiateView: true});
        });
    } else {
      this.setState({canInitiateView: true})
    }
  }

  render () {
    if (this.state.canInitiateView) {
      return (
        <BrowserRouter>
          <Main roles={this.state.roles}/>
        </BrowserRouter>
      );
    } else {
      return null;
    }
  }
}

export default App;
