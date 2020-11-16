import React, { useState, useCallback, Component } from 'react'
import { useFirebaseApp, useStorage, useMessaging, useUser, useFirestoreCollectionData } from 'reactfire'
import {
    Card,
    Col,
    Row,
    Container,
    Form,
    Button
} from 'react-bootstrap' 
//import ChatMessage from "./ChatMessage"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase';
import {auth, db} from "../FB/firebaseConfig"
import firebase from "firebase/app";

/*export default function Chat() {
    const fb = useFirebaseApp();
    const auth = useAuthState();
    const user = useUser();
    const firestore = useFirestore();
    const messageRef = firestore.collection("Messages");
    const query = messageRef.orderBy("timestamp").limit(20);
    const [messages] = useCollectionData(query, {idField : 'uid'});
    let [text, setText] = useState("");
    //const token = msg.getToken();
    const [chats, setChats] = useState([])
    const saveMessage = useCallback(async ev =>{
        ev.preventDefault();
        var aux = text
        var ts = new window.Date();
        setText("");
        try{
           await firestore
           .collection("Messages")
           .add({
            uid: user.uid,
            Message: aux,
            timestamp: ts
        });
        } catch(error){
            console.log(error);
        }
   })
    console.log(messages)
    function ChatMessage(props) {
        const { text, uid, photoURL } = props.message;
      
        const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
      
        return (<>
          <div className={`message ${messageClass}`}>
            <img src={photoURL} />
            <p>{text}</p>
          </div>
        </>)
      }
    return (
        <>
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h1>Chat</h1>
                        </Card.Header>
                        <Card.Body>
                            {messages && messages.map(msg => {
                                <ChatMessage key={msg.uid} message={msg}/>
                            })}
                        </Card.Body>
                        <Card.Footer>
                            <Form onSubmit={saveMessage}>
                                <Row>
                                    <Col sm={10}>
                                        <Form.Control
                                        type="text"
                                        size="sm"
                                        value = {text}
                                        onChange = {(ev) => setText(ev.target.value)}>
                                            
                                        </Form.Control>
                                        
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
        </>
    )

}*/
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
        console.log(this.state.message)
    }
    render() {
        const { messages } = this.state;
        const messagesList = messages.map(message => {
        return <li key={message.id}>{message.user}: {message.text}</li>
        })
        return(
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header><h1>Chat</h1></Card.Header>
                            <Card.Body>{messagesList}</Card.Body>
                            <Card.Footer>
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <Row>
                                        <Col sm={8}>
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
