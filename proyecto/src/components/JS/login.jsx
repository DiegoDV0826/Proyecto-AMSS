import React, {useContext, useState, useCallback } from 'react'
import {
    Button,
    Row,
    Col,
    Container,
    Card,
    Form
} from 'react-bootstrap'
import 'firebase/auth';
import { withRouter, Redirect } from "react-router";
import { useFirebaseApp } from 'reactfire'
import { AuthContext } from "./Auth"

export default function Login() {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const firebase = useFirebaseApp();

    const handleSubmit = useCallback(
        async(ev) => {
            ev.preventDefault();
            try{
                await firebase
                .auth()
                .signInWithEmailAndPassword(email, passwd);
            } catch(error){
                alert(error);
            }
            setEmail("");
            setPasswd("");
        }
    )

    const { currentUser } = useContext(AuthContext);
    
    if (currentUser){
        return <Redirect to="/"/>
    }

    return (
        <>
        <Container className="align-items-center">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Header>Inicia Sesión</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                            {/*<Form.Label>Ingrese correo electrónico</Form.Label>*/}
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="inlineFormInputName2"
                                placeholder="Correo Electrónico"
                                type="email"
                                size="md"
                                value= {email}
                                onChange={(ev)=>setEmail(ev.target.value)}
                            />
                            {/*Form.Label>Ingrese contraseña</Form.Label>*/}
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Contraseña"
                                size="md"
                                value={passwd}
                                onChange={(ev)=>setPasswd(ev.target.value)}
                            />
                            <br/>
                            <Button 
                                size="lg" 
                                variant="info"
                                type="submit" 
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
