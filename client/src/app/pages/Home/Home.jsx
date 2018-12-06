import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {}
});

function HomeComponent(props) {
  const { classes } = props;
  return <div> This is Home </div>;
}

export default withStyles(styles)(HomeComponent);
