import React, { useState } from 'react'
import {
    Button,
    Row,
    Col,
    Container,
    Card,
    Form
} from 'react-bootstrap';
import 'firebase/auth';
import 'firebase/database'
import { useFirebaseApp, useDatabase } from 'reactfire'
//import firebase from '../FB/firebaseConfig.js'

export default function Register() {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [nomNegocio, setNomNegocio] = useState('');
    const firebase = useFirebaseApp();
    
    let handleSubmit = e =>{
         firebase.database().ref().child('nomNegocio').push(nomNegocio)
         firebase.database().ref().child('email').push(email)
         firebase.auth().createUserWithEmailAndPassword(email,passwd);
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
                                size="md"
                                onChange={(ev)=>setEmail(ev.target.value)}
                            />
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="inlineFormInputName2"
                                placeholder="Nombre de negocio"
                                size="md"   
                                onChange={(ev)=>setNomNegocio(ev.target.value)}
                            />
                            
                            {/*Form.Label>Ingrese contraseña</Form.Label>*/}
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Contraseña"
                                size="md"
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

