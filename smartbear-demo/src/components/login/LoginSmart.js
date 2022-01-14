import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import PropTypes from 'prop-types'

import "./login.css"

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        setToken("abc");
        window.location.replace('/');
    }


    return (
        <Container className='login-container'>
            <Form onSubmit={handleSubmit} className='d-grid gap-2'>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" size='lg'>
                    Log In
                </Button>
            </Form>
        </Container>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}