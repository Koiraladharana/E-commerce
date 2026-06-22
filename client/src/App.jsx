import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import { useState } from "react";

function App(){
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const router = createBrowserRouter([
  {
    element: <Layout setFavorites={setFavorites} setSearchQuery={setSearchQuery} />,
    children:[{
        path: "/",
        element: <Home favorites={favorites} setFavorites={setFavorites} searchQuery={searchQuery} />
    },
    {
      path: "/favorites",
      element: <Favorites favorites={favorites} setFavorites={setFavorites} />
    },
  ]
  },

  {path: "signup", element:<Signup />},
  {path: "login", element:<Login />},
  {path: "*", element:<>Page Not Found</>},
]);

    return <RouterProvider router={router} />;
}

export default App;