import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Children } from "react";
import Favorites from "./pages/Favorites";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children:[{
        path: "/",
        element: <Home />
    },
    {
      path: "/favorites",
      element: <Favorites />
    }
  ]
  },

  {path: "signup", element:<Signup />},
  {path: "login", element:<Login />},
  {path: "*", element:<>Page Not Found</>},
]);
function App(){
    return <RouterProvider router={router} />;
}

export default App;