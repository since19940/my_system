import React, { Component } from "react";
import { Route, Switch} from "react-router-dom";
import history from './utils/history'
import { Router } from 'react-router';
import { authRoutes, noAuthRoutes } from "./config/routers";
import BasicLayout from './components/basic-layout'
import './index.less'


export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {
            noAuthRoutes.map((route, index) => {
              return <Route {...route} key={index} />;
            })
          }
          < BasicLayout>
            <Switch>
              {authRoutes.map((route, index) => {
                return <Route {...route} key={index} />;
              })}
            </Switch>
          </BasicLayout>
        </Switch>
      </Router>
    );
  }
}
