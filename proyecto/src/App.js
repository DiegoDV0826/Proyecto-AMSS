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
import { 
  Nav,
  Navbar,
  ButtonGroup,
  Button
 } from "react-bootstrap";


function App() {
  return (
    /*<>
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
    
    </>*/

    <>
    <Router>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">PYMEctate</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Inicio</Nav.Link>
      </Nav>
      <ButtonGroup>
        <Button variant="outline-info">Crear una cuenta</Button>
        <Button variant="info">Iniciar sesión</Button>
      </ButtonGroup>
    </Navbar>
      <Switch>
        <Route path="/" component={Index}/>
        <Route path="/iniciar-sesion" />
        <Route path="/crear-cuenta" />
      </Switch> 
    </Router>
    </>
  );
}

export default App;
