import { ThemeProvider } from '@emotion/react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useMobileConfigs} from './utils/mobile-actions'
import { ButtonPrimary,  IconLoader,  Typography } from "./components";
import themeColors from './components/styles/theme-colors'
import * as common from './assets/common'
import DemoScreen from './features/demo-screen';

const MODES = {
    DARK: 'DARK',
    LIGHT: 'LIGHT'
}

IconLoader.addIcons('icon:core/common', common)


function App() {
  const {mode} = useMobileConfigs()

  return (
    <ThemeProvider theme={themeColors[MODES.LIGHT]}>
    <div className="App">
      <Router baseName='/'>
      <Switch>
        <Route exact path='/' component={DemoScreen} />
      </Switch>
      </Router>
     {/* <ButtonPrimary title={'someTitle'} /> */}
    </div>
    </ThemeProvider>
  );
}

export default App;