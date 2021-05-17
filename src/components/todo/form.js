import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import useForm from '../hooks/useForm.js';

function TodoFrom(props) {
  const [, handleInputChange, handleSubmit] = useForm(props.handleSubmit);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Add Item</h3>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>To Do Item</Form.Label>
            <Form.Control
              name="text"
              placeholder="Add To Do List Item"
              required
              onChange={handleInputChange}
            />
            <Form.Label>Difficulty Rating</Form.Label>
            <Form.Control
              required
              defaultValue="1"
              type="range"
              min="1"
              max="10"
              name="difficulty"
              onChange={handleInputChange}
            />
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              required
              type="text"
              name="assignee"
              placeholder="Assigned To"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </>
  );
}

export default TodoFrom;
