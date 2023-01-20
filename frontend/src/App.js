import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from "react-router-dom"


import './App.scss';
import Start from "./pages/Start/Start"
import Main from "./pages/Main/Main"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="app">
          <div className="app_content">
            <Switch>
              <Route exact path={["/", "/home"]}>
                <Start />
              </Route>
              <Route exact path="/main">
                <Main />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
