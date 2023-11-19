import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopHeadlines from "routes/topHeadlines";
import MyFeed from "routes/myFeed";
import Settings from "routes/settings";
import NotFound from "routes/notFound";
import { HelmetProvider } from "react-helmet-async";
import "App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              Component={TopHeadlines}
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
    </HelmetProvider>
  );
}

export default App;
