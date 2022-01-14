import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import PropTypes from 'prop-types'
import axios from 'axios'

import "./login.css"

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        var data = {
            email: username,
            password: password
        }
        try 
        {
            await axios.post('http://smart-LoadB-C9OS8SWRFGUW-2ad6b9e4e4391bc3.elb.us-east-1.amazonaws.com:3000/auth/login', data).then((res) => {
            setToken(res.data.accessToken);
            window.location.replace('/');
        })
        }
        catch (error) {
            alert('Authentication failed');
            window.location.replace('/');            
        }
    }


    return (
        <Container className='login-container'>
            <Form onSubmit={handleSubmit} className='d-grid gap-2'>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="email" placeholder="Email" onChange={e => setUserName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" size='lg' disabled={!username}>
                    Log In
                </Button>
            </Form>
        </Container>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}