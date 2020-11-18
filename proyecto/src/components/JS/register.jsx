import React, { useState, useCallback, useContext } from 'react'
import {
    Button,
    Row,
    Col,
    Container,
    Card,
    Form,
    modal
} from 'react-bootstrap';
import 'firebase/auth';
import 'firebase/database'
import { Redirect } from "react-router";
import { AuthContext } from "./Auth"
import { useFirebaseApp, useFirestore } from 'reactfire'
//import firebase from '../FB/firebaseConfig.js'

export default function Register() {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [nomNegocio, setNomNegocio] = useState('');
    const firebase = useFirebaseApp();
    const db = useFirestore();
    
    const handleSubmit = useCallback(async ev =>{
         //let aux = {correo:email, nombre:nomNegocio};
         //firebase.database().ref().child('cuentaEmpresa').push(aux);
         ev.preventDefault();
         try{
            await firebase
            .auth()
            .createUserWithEmailAndPassword(email,passwd);
            firebase.auth().currentUser.updateProfile({
                displayName: nomNegocio
            });
         } catch(error){
             alert(error);
         }
         //window.location.reload(false);
         setEmail("");
         setPasswd("");
         setNomNegocio("");
    })
    const { currentUser } = useContext(AuthContext);
    
    if (currentUser){
        var usAux = {
            name: currentUser.displayName,
            email: currentUser.email,
            photo: currentUser.photoURL,
            id: currentUser.uid 
        }
        db.ref(`users/`).set(usAux)
        return <Redirect to="/"/>
    }
    return (
        <>
        <Container className="align-items-center">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Header>Registrate</Card.Header>
                        <Card.Body>
                            <Form>
                            {/*<Form.Label>Ingrese correo electrónico</Form.Label>*/}
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="inlineFormInputName2"
                                placeholder="Correo Electrónico"
                                type="email"
                                size="md"
                                value = {email}
                                onChange={(ev)=>setEmail(ev.target.value)}
                            />
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="inlineFormInputName2"
                                placeholder="Nombre de negocio"
                                size="md"
                                value = {nomNegocio}   
                                onChange={(ev)=>setNomNegocio(ev.target.value)}
                            />
                            
                            {/*Form.Label>Ingrese contraseña</Form.Label>*/}
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Contraseña"
                                size="md"
                                value = {passwd}
                                onChange={(ev)=>setPasswd(ev.target.value)}
                            />
                            <br/>
                            <Button 
                                size="lg" 
                                variant="info"
                                onClick={handleSubmit}                
                                block>Listo</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}

