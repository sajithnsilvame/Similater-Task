import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PropertyList from "../pages/PropertyList";

const RouteList = () => {
  const routes = [
    { path: "/", element: <LoginPage /> },
    { path: "/property-list", element: <PropertyList /> },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default RouteList;
