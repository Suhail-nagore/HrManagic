import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;