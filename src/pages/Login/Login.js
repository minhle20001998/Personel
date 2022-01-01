import React, { useState } from 'react'
import { Button, Card, Container, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router';
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setAlert(false);
            await logIn(username, password)
            navigate('/')
        } catch (error) {
            setAlert(error.message);
        }
        setLoading(false);
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In Nek</h2>
                        {alert && <Alert variant='danger'>{alert}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control value={username} required onInput={(e) => { setUsername(e.target.value) }}></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} type="password" required onInput={(e) => { setPassword(e.target.value) }}></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-3" type="submit">Log In</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Dont have account ? Sign Up
                </div>
            </div>
        </Container>
    )
}
