import React, { Component } from 'react';
import { auth } from "./fire";
import withStyles from '@material-ui/core/styles/withStyles';
import appStyles from './styles/jss/appStyles';
// import { Router, Switch, Route as BrowserRouter } from 'react-router-dom';
// import appRoutes from './routes';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          user: null,
          loading: true,
      };
  }
  componentDidMount(){
    auth.onAuthStateChanged(user => {
      console.log('AUTH STATE CHANGE');
      if(user) {
        console.log('USER');
        this.setState({ user, loading: false })
      } else {
        console.log('NO USER');
        this.setState({ user: null, loading: false })
      }
    });
  }

    handleSignout = () => {
        auth.signOut().then(() => {
          console.log('Signed out')
        }).catch(error => {
            const { code, message } = error;
            console.log(`Code: ${code}, Message: ${message}`);
        })
    }

  render() {
    const { loading, user } = this.state;
    const { classes } = this.props;
    return (
        <div className={classes.app}>
            {loading === true ? <div>Loading...</div> : user ? <Dashboard handleSignout={this.handleSignout} uid={user.uid}/> : <AuthPage />}
        </div>
    );
  };
}

export default withStyles(appStyles)(App);
