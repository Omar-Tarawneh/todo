import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
function TodoList(props) {
  return (
    <>
      <ListGroup>
        {props.list.map((item) => (
          <ListGroup.Item
            action={true}
            variant={item.complete ? 'danger' : 'success'}
            key={item._id}
            onClick={() => props.handleComplete(item._id)}
          >
            <span>{item.text}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default TodoList;
