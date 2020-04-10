import React from 'react';
import Helmet from 'react-helmet';
import Counter from '~/containers/Counter';

const About = (): React.ReactElement => {
  const counter = Counter.useContainer();

  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <h2>About Page</h2>
      <div>{counter.count}</div>
    </>
  );
};

export default About;
