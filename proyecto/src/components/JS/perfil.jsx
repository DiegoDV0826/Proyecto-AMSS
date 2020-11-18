import React from 'react'
import { Redirect } from 'react-router-dom'
import {
    Jumbotron,
    Row,
    Col,
    Image,
    Container
} from 'react-bootstrap'
export default function Profile({ User }) {
    console.log(User)
    if (!User){
        return <Redirect to="/"/>
    }
    return (
        <>
        <Container>
            <Jumbotron>
            <Row>
                <Col sm={4}>
                    <Image src={User.photoURL} rounded></Image>
                </Col>
                <Row>
                    <Col>
                        <h3>{User.displayName}</h3>
                        <h3 href={`mailto=+${User.email}`}>{User.email}</h3>
                    </Col>
                </Row>
            </Row>
            </Jumbotron>
        </Container>
        </>
    )
}
