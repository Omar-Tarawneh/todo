import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import useForm from '../hooks/useForm';
import { useContext } from 'react';
import { LoginContext } from '../../context/auth.js';
import { If, Else, Then } from 'react-if';

function Navigation(props) {
  const [sign, setSign] = useState(true);
  const [text, setText] = useState('Signup');
  const context = useContext(LoginContext);
  const [, handleInputChange, handleSubmit] = useForm(handleLogin);
  const [, handleSignupChange, handleSignup] = useForm(handleSignupSubmit);

  function handleSignupSubmit(user) {
    context.signup(user.username, user.role, user.email, user.password);
  }
  function handleLogin(user) {
    context.login(user.username, user.password);
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
      <If condition={context.loggedIn}>
        <Then>
          <Button variant="danger" onClick={context.logout}>
            Log Out
          </Button>
        </Then>
        <Else>
          <If condition={sign}>
            <Then>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Control
                      onChange={handleInputChange}
                      placeholder="username"
                      name="username"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      onChange={handleInputChange}
                      placeholder="password"
                      name="password"
                    />
                  </Col>
                  <Col>
                    <Button variant="warning" type="submit">
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Then>
            <Else>
              <Form onSubmit={handleSignup}>
                <Row>
                  <Col>
                    <Form.Control
                      onChange={handleSignupChange}
                      placeholder="username"
                      name="username"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      onChange={handleSignupChange}
                      placeholder="password"
                      name="password"
                      type="password"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      onChange={handleSignupChange}
                      placeholder="Email"
                      name="email"
                      type="email"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      name="role"
                      as="select"
                      onChange={handleSignupChange}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="edito">Editor</option>
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button variant="warning" type="submit">
                      Signup
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Else>
          </If>
          <Button
            variant="warning"
            onClick={() => {
              if (sign) {
                setSign(!sign);
                setText('Login');
              } else {
                setSign(!sign);
                setText('Signup');
              }
            }}
          >
            {text}
          </Button>
        </Else>
      </If>
    </Navbar>
  );
}

export default Navigation;
