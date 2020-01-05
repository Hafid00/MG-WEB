import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './components/Login';
import home from './components/Home';
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
            <Route exact path="/home" component={home} />
          </Switch>
        </Router>
      </Provider>

    );
  }
}

export default App;
