import { RouterProvider } from "react-router-dom";

import { createRouter } from "./routes";
import AppProvider from "./AppProvider";

const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
