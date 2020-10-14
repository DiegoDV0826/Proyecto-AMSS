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
import Login from "./components/JS/login";
import Register from "./components/JS/register";
import Profile from "./components/JS/perfil";
import { 
  Nav,
  Navbar,
  ButtonGroup,
  Button
 } from "react-bootstrap";
import {
  useFirebaseApp
} from 'reactfire';

function App() {

  const fb = useFirebaseApp();
  console.log(fb);

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
    <Router basename="/">
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">PYMEcta</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/home">Inicio</Nav.Link>
        <Nav.Link>Buscar</Nav.Link>
        <Nav.Link href="/profile">Mi perfil</Nav.Link>
      </Nav>
      <ButtonGroup>
        <Button href="/register" variant="outline-info">Crear una cuenta</Button>
        <Button href="/login" variant="info">Iniciar sesión</Button>
      </ButtonGroup>
    </Navbar>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <Route path="/home" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        {/*<Route path="/search" component={}/>*/}
      </Switch> 
    </Router>
    </>
  );
}

export default App;
