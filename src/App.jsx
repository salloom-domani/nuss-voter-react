import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SnackBarStack from "./components/common/snackbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Nominees from "./pages/Nominees";
import UnitContext from "./context/unitContext";
import NomineeContext from "./context/nomineeContext";
import NotFound from './pages/Notfound/index';

function App() {
  const [unit, setUnit] = useState({ pk: "", name: "" });
  const [nominees, setNominees] = useState([]);

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      <NomineeContext.Provider value={{ nominees, setNominees }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nominees" element={<Nominees />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route index element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
        <SnackBarStack />
      </NomineeContext.Provider>
    </UnitContext.Provider>
  );
}

export default App;
