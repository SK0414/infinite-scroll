import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CardComponent = styled.div`
  margin: 0 10px 10px;
  padding: 10px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
`;

const Card = ({ children }: Props) => {
  return <CardComponent>{children}</CardComponent>;
};

export default Card;
