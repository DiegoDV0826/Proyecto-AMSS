import React from 'react'
import {useFirebaseApp, useFirestore, useDatabase} from 'reactfire'
import { useState, useEffect } from 'react';
import firebase from "firebase/app";
import { Row, Card, Col, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/*export default function Search() {
    const db = useDatabase();
    const abortController = new AbortController();
    let [users, setUsers] = useState([]);
    async function getData(){
        db.collection("users")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                var docAux = {
                    name: doc.data().name,
                    email: doc.data().email,
                    photo: doc.data().photo
                }
                setUsers(prevUsers => {
                    return [...prevUsers, docAux]
                })
            })
        })
        return function cleanup(){
            abortController.abort()
        }
    }
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        //mountedRef.current=false
        let list = []
        var info = db.collection("users")
        .onSnapshot(snap => {
            snap.forEach(doc => {
                list.push({
                    name: doc.data().name,
                    email: doc.data().email,
                    photo: doc.data().photo
                })
                setUsers(list)
                setLoading(false)
            })
        })
        return () => {
            info();
        }
    }, [])
    console.log("adas")
    var display = users.map((user) => {
        return(
            <Col sm={6} md={4} xs={12}>
                <Card>
                    <Card.Img src={user.photo}></Card.Img>
                    <Card.Body>
                        <h4>{user.name}</h4>
                        <h4>{user.email}</h4>
                    </Card.Body>
                    <Button as={Redirect} to={`profile/${user.uid}`}>Ver</Button>
                </Card>
            </Col>
        )
    })
    console.log(display)
    const showData = () => {
        return ((loading) ? display : <h1>Hola</h1>)
    }
    return (
            
        <Container>
            <Row>
            </Row>
        </Container>
    )
}*/

/*class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            users: []
        }
    }
    
    componentDidMount(){
        firebase.database().ref("users/").on("value", snap => {
            const currUser = snap.val()
            console.log(snap.val())
            currUser.
            if(currUser !== null){
                this.setState({
                    users: [currUser]
                })
            }
        })
        var list = []
        firebase.database().ref("users").once("value", snapshot => {
            snapshot.forEach(childSnapshot => {
                list.push({
                    id:childSnapshot.key,
                    name: childSnapshot.val().name,
                    email: childSnapshot.val().email,
                    photo: childSnapshot.val().photo,
                })
            })
        })
        this.setState()
    }
    render(){
        const { users } = this.state
        const userList = users.length
        console.log(userList)
        return(
        <Container>
            <Row>
                <h1>Buscar</h1>
            </Row>
        </Container>
            
        )
    }

}*/

class Search extends React.Component{
    constructor(){
        super();
        this.state={
            users:[]
        }
    }
    componentDidMount(){
        var list = []
        firebase.database().ref("users/").on("value", snap => {
            const currUser = snap.val()
            //console.log(currUser)
            if(currUser !== null){
                this.setState({
                    users: currUser
                })
                var indexes = []
                for(var u in currUser){
                    indexes.push(u)
                }
            }
        })
        //console.log(list)
        this.setState({users:list})
    }
    
    render() {
        let { users } = this.state
        var userArr=Object.values(users)
        var listUsers = userArr.map(user => {
            console.log(user)
            return(
                <Col sm={6} md={4} xs={12} key={user.id}>
                    <Card >
                        <Card.Img src={user.photo} ></Card.Img>
                        <Card.Body>
                            <h4>{user.name}</h4>
                            <h4>{user.email}</h4>
                        </Card.Body>
                        {/*<Button as={Link} to={`profile/${user.id}`}>Ver</Button>*/}
                    </Card>
                </Col>
            )
        })
        return(
            <Container>
            <Row>
                {listUsers}
            </Row>
        </Container>
            )
    }
}

export default Search
