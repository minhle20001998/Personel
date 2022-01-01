import React from 'react'
import { Container, Nav, Navbar as MainNav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
export default function Navbar() {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut()
            navigate('/login')
        } catch (error) {
        }
    }

    return (
        <MainNav bg="dark" variant="dark">
            <Container>
                <MainNav.Brand href="#home">Minh Web</MainNav.Brand>
                <MainNav.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/daily">Daily</Nav.Link>
                    </Nav>
                </MainNav.Collapse>
                <Nav className="me-auto">
                    <NavDropdown title="" id="basic-nav-dropdown"
                        style={{
                            width: '40px', height: '40px',
                            background: '#3a3b3c', borderRadius: '100%'
                        }}
                        className='d-flex justify-content-center align-items-center'
                    >
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </MainNav>
    )
}
