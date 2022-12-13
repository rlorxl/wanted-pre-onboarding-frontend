import { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import useFetch from '../hooks/useFetch';

const TodoItem = (props) => {
  const { id, todo, isCompleted } = props.todos;

  const [enteredTodo, setEnteredTodo] = useState(todo);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('TOKEN');

  const { httpRequest } = useFetch();

  const changeCompletedHandler = () => {
    httpRequest(
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: { todo: enteredTodo, isCompleted: !isCompleted },
      },
      id
    ).then(() => props.onRender((prev) => !prev));
  };

  const deleteTodoHandler = () => {
    httpRequest(
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      id
    ).then(() => props.onRender((prev) => !prev));
  };

  const editTodo = async () => {
    httpRequest(
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: { todo: enteredTodo, isCompleted: isCompleted },
      },
      id
    )
      .then(() => props.onRender((prev) => !prev))
      .then(() => setIsEditing(false));
  };

  const changeContentHandler = (event) => {
    setEnteredTodo(event.target.value);
  };

  const cancel = () => {
    setIsEditing(false);
  };

  return (
    <TaskItemWrap>
      <TaskTextWrap>
        <input type='checkbox' id={id} onClick={changeCompletedHandler} />
        <label htmlFor={id}>
          <div>
            <CheckIcon checked={isCompleted} />
          </div>
        </label>
        <div>
          {isEditing && (
            <div>
              <EditInput
                type='text'
                value={enteredTodo}
                onChange={changeContentHandler}
              />
              <EditButton onClick={editTodo}>OK</EditButton>
              <EditButton onClick={cancel}>CANCEL</EditButton>
            </div>
          )}
          {!isEditing && <p>{todo}</p>}
        </div>
      </TaskTextWrap>
      <div>
        <AiOutlineEdit onClick={() => setIsEditing(true)} />
        <AiOutlineDelete onClick={deleteTodoHandler} />
      </div>
    </TaskItemWrap>
  );
};

const TaskItemWrap = styled.li`
  width: 100%;
  background-color: #fff;
  border-radius: 15px;
  padding: 13px 16px;
  color: #000;
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    display: flex;
    align-items: center;
  }

  p {
    margin: 0;
    font-size: 18px;
    margin-left: 8px;
  }

  [type='checkbox'] {
    display: none;
  }

  svg {
    margin-left: 8px;
    font-size: 22px;
  }
`;

const TaskTextWrap = styled.div`
  display: flex;
`;

const CheckIcon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(55, 55, 100, 0.25);
  margin-right: 8px;
  ${(props) =>
    props.checked === true &&
    css`
      background: #59e800;
      border-color: #59e800;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        display: block;
        top: 4px;
        right: 4px;
        width: 9px;
        height: 5px;
        border: 1.5px solid #fff;
        border-width: 0 0 2px 2px;
        transform: rotate(-45deg);
      }
    `}
`;

const EditInput = styled.input`
  border: none;
  font-size: 18px;
  border-bottom: 3px solid #29274d;
  color: #777;

  &:focus {
    outline: none;
  }
`;

const EditButton = styled.button`
  border: none;
  background: #ddd;
  border-radius: 5px;
  padding: 6px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    background: #888;
  }
`;

export default TodoItem;
