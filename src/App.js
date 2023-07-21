import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMobileConfigs } from "./utils/mobile-actions";
import { ButtonPrimary, IconLoader, Typography } from "./components";
import themeColors from "./components/styles/theme-colors";
import * as common from "./assets/common";
import DemoScreen from "./features/demo-screen";
import ComponentsScreen from "./features/components-screen";
import { CheckAuth, LoginPage } from "./components/auth";
import Demo2Screen from "./features/demo2-screen";
const MODES = {
  DARK: "DARK",
  LIGHT: "LIGHT",
};

IconLoader.addIcons("icon:core/common", common);

function App() {
  const { mode } = useMobileConfigs();
  console.log(process.env);
  return (
    <ThemeProvider theme={themeColors[MODES.LIGHT]}>
      <div className="App">
        <Router baseName="/">
          {/* <CheckAuth /> */}
          <Switch>
            <Route exact path="/demo" component={DemoScreen} />
            <Route exact path="/components" component={ComponentsScreen} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/demo2" component={Demo2Screen} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
