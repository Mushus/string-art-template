import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

const Wrapper = () => {
  const { count, increment, decrement } = Counter.useContainer();

  return (
    <>
      <span id="count">{count}</span>
      <input type="button" onClick={increment} value="increment" />
      <input type="button" onClick={decrement} value="decrement" />
    </>
  );
};

describe('counter', () => {
  it('shoud be increment count', () => {
    const component = render(
      <Counter.Provider>
        <Wrapper />
      </Counter.Provider>
    );

    expect(component.getByText('0')).toBeTruthy();
    fireEvent.click(component.getByDisplayValue('increment'));
    expect(component.getByText('1')).toBeTruthy();
  });

  it('shoud be decrement count', () => {
    const component = render(
      <Counter.Provider>
        <Wrapper />
      </Counter.Provider>
    );

    expect(component.getByText('0')).toBeTruthy();
    fireEvent.click(component.getByDisplayValue('decrement'));
    expect(component.getByText('-1')).toBeTruthy();
  });
});
