import React, { useContext } from 'react'
import {
    Jumbotron,
    Button,
    Row,
    Col,
    Container
} from 'react-bootstrap'
import {
    useFirebaseApp,
    AuthCheck
  } from 'reactfire';
import { AuthContext } from "./Auth";

export default function Index() {
    const user = useContext(AuthContext);
    return (
        <>
            <Jumbotron fluid>
                <Row className="justify-content-center">
                    <AuthCheck fallback={<h1>PYMEcta</h1>}>
                        <h1>Bienvenido</h1>
                    </AuthCheck>
                    
                </Row>
            </Jumbotron>
        </>
    )
}
