import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "./router/RouterProvider";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="">
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
