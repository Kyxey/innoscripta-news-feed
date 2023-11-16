import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "pages/News";
import NotFound from "pages/NotFound";
import "App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            Component={News}
          />
          <Route
            path="*"
            Component={NotFound}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
