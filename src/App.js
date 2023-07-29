import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ButtonPrimary, IconLoader, Typography } from "./components";

import * as common from "./assets/common";
import MainScreen from "./features/main-screen";
import DocsForm from "./features/docs-form";
import DocsComplete from "./features/docs-complete";
import OfferAcceptance from "./features/offer-acceptance";
import DocSign from "./features/doc-sign";
import SalaryAccept from "./features/salary-accept";
import SetPassword from "./features/set-password";
import GetCard from "./features/get-card";

import { ThemeProvider, themeOzenDefault } from "@ozen-ui/kit/ThemeProvider";
import { ProductProvider } from "./features/dummy/ProductContext";
import DocsContext from "./features/context/docs";

IconLoader.addIcons("icon:core/common", common);

function App(history) {
 const [docNumb, setDocNumb] = useState(undefined);

  return (
    <DocsContext.Provider value={{docNumb, setDocNumb}}>
        <ThemeProvider theme={themeOzenDefault}>
        <ProductProvider>
          <Router history={history} baseUrl="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2">
            <Switch>
              <Route exact path="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2/" component={MainScreen} />
              <Route exact path="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2/docs-form" component={DocsForm} />
              <Route exact path="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2/docs-complete" component={DocsComplete} />
              <Route exact path="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2/offer-acceptance" component={OfferAcceptance} />
              <Route exact path="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2/doc-sign" component={DocSign} />
              <Route exact path="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2/salary-accept" component={SalaryAccept} />
            clear  <Route exact path="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2/get-card" component={GetCard} />
              <Route exact path="/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2/set-password" component={SetPassword} />
            </Switch>
          </Router>
        </ProductProvider>
      </ThemeProvider>
    </DocsContext.Provider>
  );
}

export default App;
