import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navigation from './navBar.js';
import Card from 'react-bootstrap/Card';
import './todo.scss';

function ToDo(props) {
  const [list, setList] = useState([]);
  console.log('hello world', list);
  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let lists = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setList([...lists]);
    }
  };

  // component did Mount
  useEffect(() => {
    let list = [
      {
        _id: 1,
        complete: false,
        text: 'Clean the Kitchen',
        difficulty: 3,
        assignee: 'Person A',
      },
      {
        _id: 2,
        complete: false,
        text: 'Do the Laundry',
        difficulty: 2,
        assignee: 'Person A',
      },
      {
        _id: 3,
        complete: false,
        text: 'Walk the Dog',
        difficulty: 4,
        assignee: 'Person B',
      },
      {
        _id: 4,
        complete: true,
        text: 'Do Homework',
        difficulty: 3,
        assignee: 'Person C',
      },
      {
        _id: 5,
        complete: false,
        text: 'Take a Nap',
        difficulty: 1,
        assignee: 'Person B',
      },
    ];

    setList(list);
  }, []);
  useEffect(() => {
    let num = list.filter((item) => !item.complete).length;
    document.title = `To Do List: ${num}`;
  }, [list]);
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
                <TodoForm handleSubmit={addItem} />
              </div>

              <div className="list-todo">
                <TodoList list={list} handleComplete={toggleComplete} />
              </div>
            </section>
          </Card.Body>
        </Card>
      </main>
    </>
  );
}

export default ToDo;
