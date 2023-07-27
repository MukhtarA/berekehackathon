import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ButtonPrimary, IconLoader, Typography } from "./components";

import * as common from "./assets/common";
import DemoScreen from "./features/demo-screen";
import ComponentsScreen from "./features/components-screen";
import { CheckAuth, getAccessToken, LoginPage, softTokenRefresh } from "./components/auth";
import Demo2Screen from "./features/demo2-screen";
import DemoHackaton from "./features/demo-hackaton";

import { ThemeProvider, themeOzenDefault } from "@ozen-ui/kit/ThemeProvider";
import { Dummy } from "./features/dummy";
import { ProductProvider } from "./features/dummy/ProductContext";

IconLoader.addIcons("icon:core/common", common);

function App(history) {

  setTimeout(() => softTokenRefresh(), 50000)

  return (
    <ThemeProvider theme={themeOzenDefault}>
      <ProductProvider>
        <Router history={history}>
        <CheckAuth />
          <Switch>
            <Route exact path="/" component={DemoScreen} />
            <Route exact path="/components" component={ComponentsScreen} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/demo2" component={Demo2Screen} />
            <Route exact path="/demo3" component={DemoHackaton} />

            <Route exact path="/dummy" component={Dummy} />
          </Switch>
        </Router>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
