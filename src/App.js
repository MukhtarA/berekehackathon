import { ThemeProvider } from '@emotion/react'
import {useMobileConfigs} from './utils/mobile-actions'
import { ButtonPrimary, IconLoader, Typography } from "./components";
import themeColors from './components/styles/theme-colors'

const MODES = {
    DARK: 'DARK',
    LIGHT: 'LIGHT'
}

const theme = themeColors[MODES.LIGHT]


function App() {
  const {mode} = useMobileConfigs()
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      {/* <IconViewer /> */}
      
     <ButtonPrimary title={'someTitle'} />
     <Typography>Test</Typography>
    </div>
    </ThemeProvider>
  );
}

export default App;