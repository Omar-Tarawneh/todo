import React, { useEffect, useState } from 'react';
import useAjax from '../hooks/useAjax.js';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navigation from './navBar.js';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';

// const todoAPI = 'https://oht-auth-api.herokuapp.com/api/v1/todo';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [values, _addItem, _getTodoItems, _toggleComplete, _deleteItem] =
    useAjax();
  useEffect(() => {
    _getTodoItems();
    setList(values);
  }, [values, _getTodoItems]);
  return (
    <>
      <Navigation />
      <main>
        <Card style={{ width: '70rem' }} bg="dark" text="white">
          <Card.Title as="h2" color="white">
            To Do List Manager ({list.filter((item) => !item.complete).length})
          </Card.Title>
          <Card.Body bg="white">
            <section className="todo">
              <div>
                <TodoForm handleSubmit={_addItem} />
              </div>

              <div className="list-todo">
                <TodoList
                  list={list}
                  handleComplete={_toggleComplete}
                  handleDelete={_deleteItem}
                />
              </div>
            </section>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};

export default ToDo;
