import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Top from '~/pages/Top';
import About from '~/pages/About';
import Counter from '~/containers/Counter';

const App = (): React.ReactElement => (
  <>
    <Helmet titleTemplate="%s | React Boilerplate" />
    <HashRouter>
      <Counter.Provider>
        <h1>React Boilerplate!</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Top</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={Top} />
            <Route path="/about" component={About} />
          </Switch>
        </main>
      </Counter.Provider>
    </HashRouter>
  </>
);

export default App;
