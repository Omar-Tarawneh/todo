import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';

const TodoList = (props) => {
  // const [showToast, setShow] = useState({ ...props.list });
  return (
    <ListGroup>
      {props.list.map((item) => (
        <Toast key={item._id} onClose={() => props.handleDelete(item._id)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <Badge
              pill
              onClick={() => props.handleComplete(item._id)}
              variant={item.complete ? 'danger' : 'success'}
            >
              {item.complete ? 'Completed' : 'Pending...'}
            </Badge>
            <small className="mr-auto">{item.assignee}</small>
          </Toast.Header>
          <Toast.Body>
            {item.text}
            <div className="difficulty">
              <small className="mr-auto"> Difficulty: {item.difficulty}</small>
            </div>
          </Toast.Body>
        </Toast>
      ))}
    </ListGroup>
  );
};

export default TodoList;
