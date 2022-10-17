import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//pages
import Root from "./pages/Root";
import Calendar from "./pages/Calendar";
import Timer from "./pages/Timer";
import Overview from "./pages/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "timer",
        element: <Timer />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
