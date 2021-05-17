import { useState } from 'react';

const todoAPI = 'https://oht-auth-api.herokuapp.com/api/v1/todo';

const useAjax = () => {
  const [list, setList] = useState([]);
  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((savedItem) => {
        setList([...list, savedItem]);
      })
      .catch(console.error)
      .finally(() => {});
  };

  const _toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((savedItem) => {
          setList(
            list.map((listItem) =>
              listItem._id === item._id ? savedItem : listItem
            )
          );
        })
        .catch(console.error);
    }
  };
  const _deleteItem = async (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};
    if (item._id) {
      let url = `${todoAPI}/${id}`;
      await fetch(url, {
        method: 'delete',
        mode: 'cors',
      });
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then((data) => data.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => console.error(error));
  };
  return [list, _addItem, _getTodoItems, _toggleComplete, _deleteItem];
};

export default useAjax;
