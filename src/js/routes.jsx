import React from 'react/addons';
import Router from 'react-router';
import App from '../components/app.jsx';
import IntrnApp from '../components/templates/intrn-app/intrn-app.jsx';
import TodoApp from '../components/templates/todo-app/todo-app.jsx';
import About from '../components/templates/about/about.jsx';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name = 'intrn-app' handler={IntrnApp} />
    <Route name='todo-app' handler={TodoApp} />
    <Route name='about' path='/about' handler={About} />
    <Route name='trends' path='/trends' handler={About} />
    <NotFoundRoute handler={TodoApp} />
  </Route>
);

export default routes;
