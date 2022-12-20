import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Card from '../components/ui/Card';
import AuthContext from '../store/auth-context';

const Auth = () => {
  const [isSignupPage, setIsSignupPage] = useState(false);
  const [emailInputIsTouched, setEmailInputIsTouched] = useState(false);
  const [passwordInputIsTouched, setPasswordInputIsTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const reset = useCallback(() => {
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
    setEmailInputIsTouched(false);
    setPasswordInputIsTouched(false);
    setEmailIsValid(false);
    setPasswordIsValid(false);
    setErrorMessage('');
  }, []);

  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsSignupPage(true);
      reset();
    } else {
      setIsSignupPage(false);
      reset();
    }
  }, [location, reset]);

  const emailValidateHandler = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (
      !emailRegex.test(emailInputRef.current.value) &&
      emailInputRef.current.value.length > 0
    ) {
      setErrorMessage('이메일 형식에 맞게 입력해주세요.');
      setEmailIsValid(false);
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
      setPasswordIsValid(false);
    } else {
      setErrorMessage('');
      setPasswordIsValid(true);
    }
  };

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

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!isSignupPage) {
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
    } else {
      console.log('sign up');

      if (!emailIsValid || !passwordIsValid) {
        return;
      }

      const enteredUserEmail = emailInputRef.current.value;
      const enteredUserPassword = passwordInputRef.current.value;

      await registerUser(enteredUserEmail, enteredUserPassword)
        .then(() => navigate('/login'))
        .catch((error) => alert(error.message));
    }
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
      {!isSignupPage ? <h1>Login</h1> : <h1>Sign up</h1>}
      <AuthForm onSubmit={submitHandler}>
        <InputWrap>
          <Label htmlFor='email' small={emailInputIsTouched}>
            {!isSignupPage ? 'Email' : 'Email*'}
          </Label>
          <Input
            type='text'
            id='email'
            name='email'
            ref={emailInputRef}
            onChange={emailValidateHandler}
            onFocus={() => setEmailInputIsTouched(true)}
            onBlur={emailInputTouchHandler}
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor='password' small={passwordInputIsTouched}>
            {!isSignupPage ? 'Password' : 'Password*'}
          </Label>
          <Input
            type='password'
            id='password'
            name='password'
            ref={passwordInputRef}
            onChange={passwordValidateHandler}
            onFocus={() => setPasswordInputIsTouched(true)}
            onBlur={passwordInputTouchHandler}
          />
        </InputWrap>
        <p>{errorMessage}</p>
        <ConfirmButton disabled={!emailIsValid || !passwordIsValid}>
          {!isSignupPage ? 'LOGIN' : 'Create account'}
        </ConfirmButton>
      </AuthForm>
      {!isSignupPage && (
        <SignupButton onClick={() => navigate('/signup')}>Sign up</SignupButton>
      )}
    </Card>
  );
};

const AuthForm = styled.form`
  margin-top: 25px;
`;

const InputWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const Label = styled.label`
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

const Input = styled.input`
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

const ConfirmButton = styled.button`
  width: 100%;
  height: 60px;
  background: linear-gradient(315deg, #3b9dff 0%, #304ffe 100%);
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 15px;
  margin-top: 25px;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      background: #777;
      cursor: not-allowed;
    `}
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

export default Auth;
