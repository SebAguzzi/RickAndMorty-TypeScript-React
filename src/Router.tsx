import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterLayout } from "./common/RouterLayour";
import { HomePage, LoginPage, Detail } from "./pages";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<Detail />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
