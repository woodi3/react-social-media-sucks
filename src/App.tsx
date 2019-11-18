import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { EntryScreen } from './screens';
import { AppContainer } from './containers';

// TODO
// Handle auto login
const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app" component={AppContainer} />
        <Route path="/" component={EntryScreen} />
      </Switch>
    </Router>
  );
}

export default App;
