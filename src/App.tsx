import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "pages/News";
import MyFeed from "pages/MyFeed";
import Settings from "pages/Settings";
import NotFound from "pages/NotFound";
import "App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              Component={News}
            />
            <Route
              path="/settings"
              Component={Settings}
            />
            <Route
              path="/my-feed"
              Component={MyFeed}
            />
            <Route
              path="*"
              Component={NotFound}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
