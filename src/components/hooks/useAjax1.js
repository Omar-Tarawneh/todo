import axios from 'axios';

const useAjax = (url) => {
  const _fetchItems = async (method, url, item) => {
    const response = await axios({
      method: method,
      url: url,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      data: item,
    });
    return response.data;
  };

  const _addItem = async (item) => {
    await _fetchItems('post', url, item);
  };

  const _deleteItem = async (item) => {
    let urlItem = `${url}/${item._id}`;
    await _fetchItems('delete', urlItem, item);
  };

  const _toggleComplete = async (item) => {
    item.complete = !item.complete;
    let urlItem = `${url}/${item._id}`;
    await _fetchItems('put', urlItem, item);
  };

  const _getTodoItems = async () => {
    return _fetchItems('get', url);
  };

  return [_addItem, _getTodoItems, _toggleComplete, _deleteItem];
};

export default useAjax;
