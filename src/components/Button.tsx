import React from 'react';
import styled from '@emotion/styled';

interface Props {
  /**
   * content
   */
  children?: React.ReactNode;
  /**
   * click event
   */
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

/**
 * simple button
 */
const Button = ({ children, onClick }: Props): React.ReactElement => {
  return (
    <StyledButton type="button" onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: #0080ff;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  outline: none;
  &:active {
    background-color: #3399ff;
  }
`;

export default Button;
