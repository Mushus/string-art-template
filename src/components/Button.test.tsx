import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should be clickable', () => {
    const handleClick = jest.fn()
    const component = render(
      <Button onClick={handleClick}>button</Button>
    );

    fireEvent.click(component.getByText('button'));
    expect(handleClick).toBeCalled();
  });
});
