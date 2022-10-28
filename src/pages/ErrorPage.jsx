import React from "react";
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h3>{error.message}</h3>
      <p>Ops, something went wrong! Please try again. </p>
    </div>
  );
}

export default ErrorPage;
