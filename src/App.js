import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import store from './store';
import {Provider} from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div>
          <Route exact path = "/" component={Login}/>
        </div>
      </Router>
      </Provider>
      
    );
  }
}

export default App;
