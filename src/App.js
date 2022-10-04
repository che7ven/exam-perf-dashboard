import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "./containers";
import { UsersProvider } from "./utils/usersContext";

const App = () => {
  return (
    <UsersProvider>
      <title>Exam Dashboard</title>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UsersProvider>
  );
};

export default App;
