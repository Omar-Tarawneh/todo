import { useState } from 'react';

const useForm = (callbackSubmit) => {
  const [item, setItem] = useState({});
  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    await callbackSubmit(item);
    const items = {};
    setItem({ items });
  };
  return [item, handleInputChange, handleSubmit];
};

export default useForm;
