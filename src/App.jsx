import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Root from "./pages/Root";
import Calendar from "./pages/Calendar";
import TimerPage from "./pages/Timer";
import Overview from "./pages/Overview";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TimerPage />,
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
