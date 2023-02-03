import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ManageTeams from "./scenes/ManageTeams";
import Invoices from "./scenes/invoices";
import ContactsInformation from "./scenes/ContactsInformation";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  function ScrollToTop({ history, children }) {
    useEffect(() => {
      const unlisten = history.listen(() => {
        const main = document.querySelector("#inner-layout-content");
        main.scrollTo(0, 0);
      });
      return () => {
        unlisten();
      };
    }, []);

    return <Fragment>{children}</Fragment>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <ManageTeams />
            <Switch>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/teams" element={<ManageTeams />} />
              <Route exact path="/contacts" element={<ContactsInformation />} />
              <Route exact path="/invoices" element={<Invoices />} />
              <Route exact path="/form" element={<Form />} />
              <Route exact path="/bar" element={<Bar />} />
              <Route exact path="/pie" element={<Pie />} />
              <Route exact path="/line" element={<Line />} />
              <Route exact path="/faq" element={<FAQ />} />
              <Route exact path="/calendar" element={<Calendar />} />
              <Route exact path="/geography" element={<Geography />} />
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
