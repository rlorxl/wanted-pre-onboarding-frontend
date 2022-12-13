# 원티드 프리온보딩 프론트엔드 과제

## 배포 링크

https://wanted-pre-onboarding-frontend-red.vercel.app/

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

\*\*

## 설치 및 실행

```js
npm install
npm start
```

---

<img src="https://img.shields.io/badge/react-%23444444.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/react_router@6-%23CA4245.svg?style=for-the-badge&logo=router"> <img src="https://img.shields.io/badge/contextAPI-%2309D3AC.svg?style=for-the-badge">
