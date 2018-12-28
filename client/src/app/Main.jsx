import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SecurityIcon from '@material-ui/icons/Security';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import NotFound from './pages/Error/404';
import Login from './components/Login/Login';
import Meals from './pages/Meals/Meals';

const drawerWidth = 240;
let icons = [{
  icon: <HomeIcon/>,
  text: 'Home',
  link: '/'
}];
const styles = theme => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      icons: [],
      roles: [],
      routeAcl: {
        'Admin': 'admin',
        'Meals': 'employee'
      }
    };
  }

  componentWillMount () {
    let userRoles = this.props.roles;
    console.log(icons);
    if (userRoles.length > 0) {
      icons.push({
        icon: <FastFoodIcon/>,
        text: 'Food',
        link: '/meals'
      });

      /**
       * Adding the admin left icon if user is admin
       */
      if (userRoles.indexOf('admin') > -1) {
        icons.push({
          icon: <SecurityIcon/>,
          text: 'Admin',
          link: '/admin'
        });
      }
    }
    this.setState({ icons: icons });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render () {
    const { classes, theme, roles } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.grow}>
              Office Meals
            </Typography>
            <Login/>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <List>
            {this.state.icons.map((icon, index) => (
              <Link to={icon.link} key={index}>
                <ListItem button>
                  <ListItemIcon>{icon.icon}</ListItemIcon>
                  <ListItemText primary={icon.text}/>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute exact path="/meals" component={Meals} access={this.state.routeAcl.Meals}
                          roles={roles}/>
            <PrivateRoute exact path="/admin" component={Admin} access={this.state.routeAcl.Admin}
                          roles={roles}/>
            <Route component={NotFound}/>
          </Switch>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        checkAccess(rest.access, rest.roles) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function checkAccess (access, roles) {
  return roles.indexOf(access) > -1;
}

export default withStyles(styles, { withTheme: true })(Main);