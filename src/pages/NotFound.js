import React from 'react';
import styled from 'styled-components';

const NotFoundPage = () => {
  return <NotFound>⚠️ Sorry, An invalid approach was attempted.</NotFound>;
};

const NotFound = styled.p`
  position: absolute;
  top: 3%;
  left: 3%;
  color: #fff;
  font-size: 34px;
`;

export default NotFoundPage;
