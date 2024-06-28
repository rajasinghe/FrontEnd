import React from "react";
import { Outlet } from "react-router-dom";

function UsersPage() {
  return (
    <>
      <div>users page</div>
      <Outlet />
    </>
  );
}

export default UsersPage;
