import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Card from '../../components/ui/Card';
import AuthContext from '../../store/auth-context';

const Login = () => {
  const [emailInputIsTouched, setEmailInputIsTouched] = useState(false);
  const [passwordInputIsTouched, setPasswordInputIsTouched] = useState(false);

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();

  const login = async (email, password) => {
    const response = await fetch(
      'https://pre-onboarding-selection-task.shop/auth/signin',
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

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      alert('입력이 완료되지 않았습니다!');
      return;
    }

    await login(enteredEmail, enteredPassword)
      .then((result) => {
        if (result.access_token) {
          authCtx.login(result.access_token);
        }
      })
      .then(() => navigate('/todo'))
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
      <h1>Login</h1>
      <LoginForm onSubmit={loginHandler}>
        <LoginInputWrap>
          <LoginLabel htmlFor='email' small={emailInputIsTouched}>
            Email
          </LoginLabel>
          <LoginInput
            type='text'
            id='email'
            name='email'
            ref={emailInputRef}
            onFocus={() => setEmailInputIsTouched(true)}
            onBlur={emailInputTouchHandler}
          />
        </LoginInputWrap>
        <LoginInputWrap>
          <LoginLabel htmlFor='password' small={passwordInputIsTouched}>
            Password
          </LoginLabel>
          <LoginInput
            type='password'
            id='password'
            name='password'
            ref={passwordInputRef}
            onFocus={() => setPasswordInputIsTouched(true)}
            onBlur={passwordInputTouchHandler}
          />
        </LoginInputWrap>
        <LoginButton>LOGIN</LoginButton>
      </LoginForm>
      <SignupButton onClick={() => navigate('/signup')}>Sign up</SignupButton>
    </Card>
  );
};

const LoginForm = styled.form`
  margin-top: 25px;
`;

const LoginInputWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const LoginLabel = styled.label`
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

const LoginInput = styled.input`
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

const LoginButton = styled.button`
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

const SignupButton = styled.button`
  border: none;
  background: #fff;
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
