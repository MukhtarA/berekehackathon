import React, { useState } from "react ";
import { Tabs, Tab } from "@ozen-ui/kit/Tabs";

const TabPanel = () => {
  const [value, setValue] = useState();
  const a11yProps = (index) => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  });
  return <></>;
};
