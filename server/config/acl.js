const _ = require('lodash');
let ACL = {
  accessList: {
    'admin': {},
    'auth': {
      'google-login': ['guest'],
      'google-logout': ['admin', 'employee']
    },
    'users': {
      'get-all-employees': ['admin'],
      'get-my-roles': ['admin', 'employee'],
      'get-my-profile': ['admin', 'employee']
    }
  },
  'getAllACL': () => {
    return ACL.accessList
  },
  'aclLookup': (moduleName, api, roles) => {
    let requestApiAccessList = ACL.accessList[moduleName][api];
    if(requestApiAccessList) {
      let allowedRoles = _.intersection(roles, requestApiAccessList);
      return (allowedRoles.length > 0);
    } else {
      return false
    }
  }
}

module.exports = ACL;