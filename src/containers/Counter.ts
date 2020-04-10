import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';

interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounter = (): UseCounterResult => {
  const [count, setCount] = useState(0);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const increment = useCallback(() => setCount(c => c + 1), []);
  return {
    count,
    decrement,
    increment,
  };
};

export default createContainer(useCounter);
