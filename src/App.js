import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './components/Login';
import store from './store';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="auth-inner">
          <Switch>
          <Route exact path = "/" component={Login}/>
          </Switch>
        </div>
      </Router>
      </Provider>
      
    );
  }
}

export default App;
