import React, { useState, useCallback, Component } from 'react'
import { useFirebaseApp, useStorage, useMessaging, useUser, useFirestoreCollectionData } from 'reactfire'
import {
    Card,
    Col,
    Row,
    Container,
    Form,
    Button,
    Toast,
    Popover
} from 'react-bootstrap' 
//import ChatMessage from "./ChatMessage"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase';
import {auth, db} from "../FB/firebaseConfig"
import firebase from "firebase/app";
import {Message} from 'react-chat-ui'


class Chat extends Component{
    
    constructor(){
        super();
        this.state = {
            message:"",
            messages: [
                //{id:0, text:"Hola Mundo"},
                //{id:1, text:"adios"}
            ],
        }
    }

    componentDidMount(){
        firebase.database().ref("messages/").on("value", snap=> {
            const currentMessages = snap.val();
            if (currentMessages !== null){
                this.setState({
                    messages: currentMessages
                });
            }
        })
    }

    handleSubmit(e){
        e.preventDefault()
        if(this.state.message === ""){
            return;
        }
        const list = this.state.messages
        const newMessage = {
            id:this.state.messages.length,
            text:this.state.message,
            user: firebase.auth().currentUser.displayName,
            timestamp: new window.Date()
        }
        //list.push(newMessage);
        //this.setState({messages:list})

        firebase.database().ref(`messages/${newMessage.id}`)
        .set(newMessage);
        this.setState({
            message:""
        })
    }
    updateMessage(e){
        this.setState({message: e.target.value});
        //console.log(this.state.message)
    }
    isValidURL(e){
        //console.log(e)
        try{
            new URL(e.text);
        }catch(_){
            return  <p key={e.id}>{e.text}</p>
        }
    return <a key={e.id} href={new URL(e.text)} target = "_blank">{e.text}</a>
    }
    render() {
        const { messages } = this.state;
        const messagesList = messages.map(message => {
        if(message.user === firebase.auth().currentUser.displayName){
            return(
                <Row>
                    <Col sm={{span:6, offset:9}}>
                    <Card style={{ width: '18rem', height: '7rem' }}>
                        <Card.Body>
                        <h4 key={message.id}>{message.user}</h4>
                            {this.isValidURL(message)}
                        </Card.Body>
                    </Card>
                    </Col>
                    <br></br>
                </Row>
            )
        }else{
            return(
                <Row >
                    <Col sm={{span:6, offset:0}}>
                    <Card style={{ width: '18rem' , height: '7rem'}}>
                        <Card.Body>
                        <h4 key={message.id}>{message.user}</h4>
                            {this.isValidURL(message)}
                        </Card.Body>
                    </Card>
                    </Col>
                    <br/>
                </Row>
            )
        }
        //return <li key={message.id}>{message.user}: {message.text}</li>
        })
        return(
            
            <Container fluid>
                <Row>
                    <Col>
                        <Card >
                            <Card.Header><h1>Chat</h1></Card.Header>
                            <Card.Body style={{overflow:'auto', height:'18rem', width:'auto'}}>{messagesList}</Card.Body>
                            <Card.Footer>
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <Row>
                                        <Col sm={10}>
                                            <Form.Control
                                            type="text"
                                            onChange={this.updateMessage.bind(this)}
                                            value={this.state.message}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Button size="sm" type="submit">Send</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Chat;
