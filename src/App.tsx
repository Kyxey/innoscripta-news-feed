import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "pages/News";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
