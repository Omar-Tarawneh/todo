import React, { useState, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import { PageContext } from '../../context/pagination.js';

const TodoList = (props) => {
  // pagination logic srouce from Traversy Media :) <3 https://www.youtube.com/watch?v=IYCa1F-OWmk

  const context = useContext(PageContext);
  const [currentPage, setCurrentPage] = useState(context.startingPage);
  const maxItems = context.itemCount;
  // sorting hard-coded according to difficulty
  const sortedList = props.list.sort((a, b) => b.difficulty - a.difficulty);
  // display completed items first
  const allList = sortedList.sort((a, b) => {
    return a.complete === b.complete ? 0 : a ? -1 : 1;
  });

  // logic
  const numOfPages = allList.length / maxItems + 1;
  const indexOfLastItem = currentPage * maxItems;
  const indexOfFirstItem = indexOfLastItem - maxItems;
  const currentList = allList.slice(indexOfFirstItem, indexOfLastItem);
  const nextPage = (num) => setCurrentPage(num);

  const pageNums = [];
  const activePage = currentPage;
  for (let num = 1; num < numOfPages; num++) {
    pageNums.push(
      <Pagination.Item
        key={num}
        acitvePage={num === activePage}
        onClick={() => nextPage(num)}
      >
        {num}
      </Pagination.Item>
    );
  }
  return (
    <ListGroup>
      {currentList.map((item) => (
        <Toast
          key={item._id}
          onClose={async () => {
            await props.handleDelete(item);
            await props.getList();
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <Badge
              pill
              onClick={async () => {
                await props.handleComplete(item);
                await props.getList();
              }}
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
      <Pagination>{pageNums}</Pagination>
    </ListGroup>
  );
};

export default TodoList;
