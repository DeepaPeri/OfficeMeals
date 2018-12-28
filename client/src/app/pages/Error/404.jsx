import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render () {
    return (
      <div>
        <Typography variant="h3">
          404
        </Typography>
        <Typography variant="caption">
          Go <Link to="/">Home</Link> buddy, you are drunk.
        </Typography>
      </div>
    );
  }
}

export default NotFound;
