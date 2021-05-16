import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Navigation(props) {
  return (
    <Navbar bg="primary" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
