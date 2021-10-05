import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import { HomePage, NotFound404 } from "../../pages";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
