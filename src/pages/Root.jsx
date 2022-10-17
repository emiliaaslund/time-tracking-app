import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
}

export default Root;
