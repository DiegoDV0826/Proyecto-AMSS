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
  useFirebaseApp,
  AuthCheck,
  useUser
} from 'reactfire';
import {AuthProvider} from "./components/JS/Auth";
import PrivateRoute from "./components/JS/PrivateRoute"
function App() {
  const user=useUser();
  const fb = useFirebaseApp();
  return (
    <>
    <AuthProvider>
    <Router basename="/">
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">PYMEcta</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/home">Inicio</Nav.Link>
        <Nav.Link>Buscar</Nav.Link>
        <Nav.Link href="/profile">Mi perfil</Nav.Link>
      </Nav>
      <AuthCheck fallback={
        <ButtonGroup>
          <Button href="/register" variant="outline-info">Crear una cuenta</Button>
          <Button href="/login" variant="info">Iniciar sesión</Button>
        </ButtonGroup>
      }>
        <ButtonGroup>
          <Button onClick = {() => fb.auth().signOut()}>Terminar Sesion</Button>
        </ButtonGroup>
      </AuthCheck>
      
    </Navbar>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <Route path="/home" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register} />
        <PrivateRoute path="/profile" component={Profile} />
        {/*<Route path="/search" component={}/>*/}
      </Switch> 
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
