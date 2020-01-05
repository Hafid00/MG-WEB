import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Towns from './components/Towns';
import Hotels from './components/Hotels';
import Places from './components/Places';
import Restaurants from './components/Restaurants';


import store from './store';
import { Provider } from 'react-redux';
import history from './history';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/towns" component={Towns} />
            <Route exact path="/places" component={Places} />
            <Route exact path="/restaurants" component={Restaurants} />
            <Route exact path="/hotels" component={Hotels} />
          </Switch>
        </Router>
      </Provider>

    );
  }
}

export default App;
