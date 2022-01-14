import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

export default function Header() {

    const handleLogout = async e => {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace('/');
    }


    return (
        <Navbar variant='dark' bg='dark'>
            <Container>
                <Navbar.Brand href="/">SmartBear Demo</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button variant='dark' onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}