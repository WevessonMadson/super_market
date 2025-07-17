import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Lists from "./pages/Lists/Lists";
import Privacy from "./pages/Privacy/Privacy";
import Settings from "./pages/Settings/Settings";
import Share from "./pages/Share/Share";
import Suggestion from "./pages/Sugestion/Suggestion";
import { MenuProvider } from "./contexts/MenuContext";
import Layout from "./components/Layout/Layout";
import { PageTitleProvider } from "./contexts/PageTitleContext";
import { SettingsProvider } from "./contexts/SetingsContext";
import { ListsProvider } from "./contexts/ListsContext";

function App() {
  return (
    <SettingsProvider>
      <PageTitleProvider>
        <MenuProvider>
          <ListsProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/lists" element={<Lists />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/share" element={<Share />} />
                  <Route path="/sugestion" element={<Suggestion />} />
                </Route>
                <Route path="/privacite" element={<Privacy />} />
              </Routes>
            </BrowserRouter>
          </ListsProvider>
        </MenuProvider>
      </PageTitleProvider>
    </SettingsProvider>
  );
}

export default App;
