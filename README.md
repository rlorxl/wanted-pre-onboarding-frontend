# 원티드 프리온보딩 프론트엔드 과제

## 배포 링크

https://wanted-pre-onboarding-frontend-red.vercel.app/

<img src="https://img.shields.io/badge/react-%23444444.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/react_router@6-%23CA4245.svg?style=for-the-badge&logo=router"> <img src="https://img.shields.io/badge/contextAPI-%2309D3AC.svg?style=for-the-badge">

<br />

## 기능구현

### 1.로그인 / 회원가입

**유효성 검사**

- ref, 정규식test를 통해 유효성 검사 후 결과에 따라 에러메세지와 validate상태를 업데이트 하여 조건이 만족할 때만 버튼이 활성화되도록 하였습니다.

```js
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
```

<br />

**JWT저장**

- contextAPI의 loginHandler함수를 사용하여 JWT가 로컬스토리지에 저장되고 App.js에서 이를 통해 리다이렉트 처리를 구현했습니다.

```js
const loginHandler = (token) => {
  setToken(token);
  localStorage.setItem('TOKEN', token);
};
```

```js
<Route
  path='/'
  element={authCtx.isLoggedIn ? <Navigate to='/todo' /> : <Auth />}
/>
```

<br />

### 2.투두 리스트

- api요청을 위한 커스텀 훅을 만들어 활용하였습니다.

```js
const useFetch = () => {
  const httpRequest = useCallback(async (requestConfig, id) => {
    const { method, headers, boody } = requestConfig;

    const url = !id
      ? 'https://pre-onboarding-selection-task.shop/todos'
      : `https://pre-onboarding-selection-task.shop/todos/${id}`;

    try {
      const response = await fetch(url, {
        method: method ? method : 'GET',
        headers: headers ? headers : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return { httpRequest };
};
```

---

## 설치 및 실행

```js
npm install
npm start
```
