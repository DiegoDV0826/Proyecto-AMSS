import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Index from "./components/JS/index";
import Login from "./components/JS/login";
import Register from "./components/JS/register";
import Profile from "./components/JS/perfil";
import Chat from "./components/JS/chat";
import Search from "./components/JS/search"
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
  //console.log(user)
  return (
    <>
    <AuthProvider>
    <Router basename="/">
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">PYMEcta</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/home">Inicio</Nav.Link>
        <Nav.Link href="/search">Buscar</Nav.Link>
        <AuthCheck>
          <Nav.Link href="/chat">Chat</Nav.Link>
        </AuthCheck>
      </Nav>
      <AuthCheck fallback={
        <ButtonGroup>
          <Button href="/register" variant="outline-info">Crear una cuenta</Button>
          <Button href="/login" variant="info">Iniciar sesión</Button>
        </ButtonGroup>
      }>
        <ButtonGroup>
          <Button href="/profile" variant="outline-info">Mi perfil</Button>
          <Button onClick = {() => fb.auth().signOut()} variant="danger">Terminar Sesion</Button>
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
        <PrivateRoute path="/profile" component={() => <Profile User={fb.auth().currentUser}/>} />
        <PrivateRoute path="/chat" component={Chat}/>
        <Route path="/search" component={Search}/>
      </Switch> 
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
