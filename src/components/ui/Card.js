import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
  return <CardWrap color={props.color}>{props.children}</CardWrap>;
};

const CardWrap = styled.div`
  width: 500px;
  background-color: ${(props) => props.color};
  padding: 25px;
  border-radius: 25px;
  position: absolute;
  top: 30vh;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  box-shadow: 0 10px 45px rgba(26, 28, 59, 0.5);
`;

export default Card;
