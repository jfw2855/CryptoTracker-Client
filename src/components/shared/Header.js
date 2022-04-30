import React, { Fragment } from 'react'
import { Dropdown, DropdownButton,NavDropdown} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Navbar.Brand >
            <Link to='/home' className='logo'>
                CryptoTracker
            </Link>
        </Navbar.Brand>
		<Nav.Link style={linkStyle}>
			<Link to='portfolio'>
				Portfolio
			</Link>
		</Nav.Link>
		<Nav.Link style={linkStyle}>
			<Link to='favorites'>
				Favorites
			</Link>
		</Nav.Link>
		<NavDropdown title="Profile" style={linkStyle} className="dropdown-style">
			<NavDropdown.Item className="navv-link">
				<Link to='portfolio' className="navv-link">Portfolio</Link>
			</NavDropdown.Item>
			<NavDropdown.Item className="navv-link">
				<Link to='change-password' className="navv-link">Change Password</Link>
			</NavDropdown.Item>
			<NavDropdown.Item className="navv-link" >
				<Link to='sign-out' className="navv-link">Sign Out</Link>
			</NavDropdown.Item>
    	</NavDropdown>
	</>
)

const unauthenticatedOptions = (
	<>
		<Navbar.Brand >
            <Link to='/' className='logo'>
                CryptoTracker
            </Link>
        </Navbar.Brand >
        <Nav.Link>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Link>
	</>
)


const Header = ({ user }) => (
	<Navbar className='navbar'>

		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='me-auto'>
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
