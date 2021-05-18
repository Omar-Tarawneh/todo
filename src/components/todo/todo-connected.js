import React, { useEffect, useState } from 'react';
import PageProvider from '../../context/pagination.js';
import useAjax from '../hooks/useAjax1.js';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navigation from './navBar.js';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';

const todoAPI = 'https://oht-auth-api.herokuapp.com/api/v1/todo';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [_addItem, _getTodoItems, _toggleComplete, _deleteItem] =
    useAjax(todoAPI);

  const _getList = () => {
    const fetchList = async () => {
      try {
        let data = await _getTodoItems();
        setList(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchList();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(_getList, []);
  console.log(list);
  return (
    <>
      <PageProvider>
        <Navigation />
        <main>
          <Card style={{ width: '70rem' }} bg="dark" text="white">
            <Card.Title as="h2" color="white">
              To Do List Manager ({list.filter((item) => !item.complete).length}
              )
            </Card.Title>
            <Card.Body bg="white">
              <section className="todo">
                <div>
                  <TodoForm handleSubmit={_addItem} getList={_getList} />
                </div>

                <div className="list-todo">
                  <TodoList
                    list={list}
                    handleComplete={_toggleComplete}
                    handleDelete={_deleteItem}
                    getList={_getList}
                  />
                </div>
              </section>
            </Card.Body>
          </Card>
        </main>
      </PageProvider>
    </>
  );
};

export default ToDo;
