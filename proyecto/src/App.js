import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import Index from "./components/JS/index";


function App() {
  return (
    <>
    <Router>
      <div>
        <ol>
          <li>
            <Link to="/index">index</Link>
          </li>
        </ol>
      </div>

      <Switch>
        <Route path="/index" component={Index}/>
      </Switch>
    </Router>
    
    </>
  );
}

export default App;
