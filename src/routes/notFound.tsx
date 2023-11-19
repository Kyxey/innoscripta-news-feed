import Header from "components/header";
import NotFound from "components/notFound";
import { Helmet } from "react-helmet";

function NotFoundPage() {
  return (
    <div className="w-full h-full space-y-9 pt-28">
      <Helmet>
        <title>Innoscripta News Feed | 404 Page Not Found</title>
      </Helmet>
      <Header />
      <NotFound />
    </div>
  );
}

export default NotFoundPage;
