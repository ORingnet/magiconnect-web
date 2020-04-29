import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as ROUTES from './router';
import App from './pages/App';
import Home from './pages/Home';
const history = createBrowserHistory();

const rootRouter = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL} history={history}>
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.INDEX} component={App} />
    </Switch>
  </BrowserRouter>
);
export default rootRouter;
