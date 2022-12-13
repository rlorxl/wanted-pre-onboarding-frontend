import React, { useEffect, useRef, useState } from 'react';
import TodoItem from '../../components/TodoItem';
import Card from '../../components/ui/Card';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';

const TodoList = () => {
  const [todosData, setTodosData] = useState([]);
  const [updateTodos, setUpdateTodos] = useState(false);

  const todoInputRef = useRef();

  const token = localStorage.getItem('TOKEN');

  const { httpRequest } = useFetch();

  useEffect(() => {
    if (httpRequest && token) {
      httpRequest({
        headers: { Authorization: `Bearer ${token}` },
      }).then((data) => setTodosData(data));
    }
  }, [httpRequest, updateTodos, token]);

  const createTodoHandler = (event) => {
    event.preventDefault();

    const enteredTodo = todoInputRef.current.value;

    if (enteredTodo.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }

    httpRequest({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: { todo: enteredTodo },
    }).then(() => setUpdateTodos((prev) => !prev));

    todoInputRef.current.value = '';
  };

  return (
    <Card color='#35305B'>
      <Title>New Todo</Title>
      <TodoForm onSubmit={createTodoHandler}>
        <TodoInput type='text' ref={todoInputRef} />
        <AddButton>ADD</AddButton>
      </TodoForm>
      <ul>
        {todosData.length > 0 &&
          todosData.map((data) => (
            <TodoItem key={data.id} todos={data} onRender={setUpdateTodos} />
          ))}
      </ul>
    </Card>
  );
};

const Title = styled.h2`
  color: #fff;
  text-align: start;
  margin: 0;
`;

const TodoForm = styled.form`
  display: flex;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const TodoInput = styled.input`
  border: none;
  background: #413a6e;
  width: 100%;
  height: 55px;
  border-radius: 5px;
  color: #fff;
  text-indent: 10px;
  font-size: 18px;

  &:focus {
    outline: none;
  }
`;

const AddButton = styled.button`
  width: 150px;
  height: 55px;
  background: #9e3cd7;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

export default TodoList;
