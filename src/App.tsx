import React from 'react';
import { Router, Route } from "react-router-dom";
import Profile from './components/Profile';
import Main from './components/Main';
import { createBrowserHistory } from 'history';

//main styles
import './styles.css';

function App() {
  const history = createBrowserHistory();

  if (!process.env.REACT_APP_GIT_TOKEN) return <div>Please Make .env in projects's root directory with variable "REACT_APP_GIT_TOKEN=YOUR_TOKEN" and restart the project</div>

  return (
    <Router history={history}>
      <Route exact path='/' component={Main} />
      <Route path='/:user' component={Profile} />
    </Router>
  );
}

export default App;


