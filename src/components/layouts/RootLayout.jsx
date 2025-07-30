import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../shared/utils/ScrollToTop";

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
