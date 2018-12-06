import React from 'react';

export const defaultUser = {
  data: {
    sessionId: null,
    name: {
      familyName: 'default',
      givenName: 'default'
    }
  }
};

export const UserContext = React.createContext(defaultUser);
