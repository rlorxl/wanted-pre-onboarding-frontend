import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Card from '../../components/ui/Card';

const Signup = () => {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [emailInputIsTouched, setEmailInputIsTouched] = useState(false);
  const [passwordInputIsTouched, setPasswordInputIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();

  const emailValidateHandler = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (
      !emailRegex.test(emailInputRef.current.value) &&
      emailInputRef.current.value.length > 0
    ) {
      setErrorMessage('이메일 형식에 맞게 입력해주세요.');
    } else {
      setErrorMessage('');
      setEmailIsValid(true);
    }
  };

  const passwordValidateHandler = () => {
    if (
      passwordInputRef.current.value.length > 0 &&
      passwordInputRef.current.value.length < 8
    ) {
      setErrorMessage('패스워드를 8자리 이상 입력해주세요.');
    } else {
      setErrorMessage('');
      setPasswordIsValid(true);
    }
  };

  const registerUser = async (email, password) => {
    const response = await fetch(
      'https://pre-onboarding-selection-task.shop/auth/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }

    return data;
  };

  const signupHandler = async (event) => {
    event.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    const enteredUserEmail = emailInputRef.current.value;
    const enteredUserPassword = passwordInputRef.current.value;

    await registerUser(enteredUserEmail, enteredUserPassword)
      .then(() => navigate('/login'))
      .catch((error) => alert(error.message));
  };

  const emailInputTouchHandler = () => {
    if (emailInputRef.current.value === '') {
      setEmailInputIsTouched(false);
    }
  };

  const passwordInputTouchHandler = () => {
    if (passwordInputRef.current.value === '') {
      setPasswordInputIsTouched(false);
    }
  };

  return (
    <Card color='#fff'>
      <h1>Sign up</h1>
      <SignupForm onSubmit={signupHandler}>
        <SignupInputWrap>
          <SignupLabel htmlFor='email' small={emailInputIsTouched}>
            Email*
          </SignupLabel>
          <SignupInput
            type='text'
            id='email'
            name='email'
            ref={emailInputRef}
            onChange={emailValidateHandler}
            onFocus={() => setEmailInputIsTouched(true)}
            onBlur={emailInputTouchHandler}
          />
        </SignupInputWrap>
        <SignupInputWrap>
          <SignupLabel htmlFor='password' small={passwordInputIsTouched}>
            Password*
          </SignupLabel>
          <SignupInput
            type='password'
            id='password'
            name='password'
            ref={passwordInputRef}
            onChange={passwordValidateHandler}
            onFocus={() => setPasswordInputIsTouched(true)}
            onBlur={passwordInputTouchHandler}
          />
        </SignupInputWrap>
        <p>{errorMessage}</p>
        <CreateButton disabled={!emailIsValid || !passwordIsValid}>
          Create account
        </CreateButton>
      </SignupForm>
    </Card>
  );
};

const SignupForm = styled.form`
  margin-top: 25px;
`;

const SignupInputWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const SignupLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-30%);
  font-size: 22px;
  color: #777;

  @keyframes direction {
    0% {
      font-size: 22px;
      transform: translate(0, 0);
    }

    100% {
      font-size: 13px;
      transform: translate(0, -25px);
    }
  }

  ${(props) =>
    props.small &&
    css`
      color: #006dff;
      animation: direction 0.4s ease forwards;
    `}
`;

const SignupInput = styled.input`
  width: 100%;
  height: 85%;
  text-indent: 10px;
  border: none;
  border-bottom: 4px solid #302c54;
  padding-top: 15px;
  margin-top: 12px;
  font-size: 22px;

  &:focus {
    outline: none;
    border-bottom: 4px solid #006dff;
  }
`;

const CreateButton = styled.button`
  width: 100%;
  height: 60px;
  background: linear-gradient(315deg, #3b9dff 0%, #304ffe 100%);
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 15px;
  margin-top: 25px;
  cursor: pointer;
`;

export default Signup;
