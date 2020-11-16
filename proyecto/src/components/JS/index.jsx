import React, { useContext } from 'react'
import {
    Jumbotron,
    Row
} from 'react-bootstrap'
import {
    AuthCheck,
    useFirebaseApp
  } from 'reactfire';
import { AuthContext } from "./Auth";

export default function Index() {
    const fb = useFirebaseApp();
    const user = fb.auth().currentUser;
    console.log(user)
    const checkUser = () => {
        if(!(user === null)){
            return <h1>, {user.displayName}</h1>
        }
    }
    return (
        <>
            <Jumbotron fluid>
                <Row className="justify-content-center">
                    <h1>Bienvenido a PYMEcta</h1>
                    {checkUser()}
                </Row>
            </Jumbotron>
        </>
    )
}
