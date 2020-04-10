import React from 'react';
import Helmet from 'react-helmet';
import Counter from '~/containers/Counter';
import Button from '~/components/Button';

const Top = (): React.ReactElement => {
  const counter = Counter.useContainer();

  return (
    <>
      <Helmet>
        <title>Top</title>
      </Helmet>
      <h2>Top Page</h2>
      <div>{counter.count}</div>
      <div>
        <Button onClick={counter.increment}>+</Button>
        <Button onClick={counter.decrement}>-</Button>
      </div>
    </>
  );
};

export default Top;
