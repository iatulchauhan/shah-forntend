import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Loader from './Components/Loader';
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import Register from "./Pages/Register";
import User from "./Pages/User";
import Payment from "./Pages/Payment";
import MeetingList from "./Pages/Meeting";
import OfferPage from "./Pages/Offer";
import Branches from "./Pages/Branches";
import Visitor from "./Pages/Visitor";
import FinancialData from "./Pages/FinancialData";
import ExpiringPlan from "./Pages/ExpiringPlan";
import Email from "./Pages/Email";
import VerifyAttendance from "./Pages/VerifyAttendance";
import ModifyPlan from "./Pages/ModifyPlan";
import AssignFile from "./Pages/AssignFile";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <ThemeProvider theme={lightTheme}>
        <Loader />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/meeting" element={<MeetingList />} />
          <Route path="/offer" element={<OfferPage />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/visitor" element={<Visitor />} />
          <Route path="/financial-data" element={<FinancialData />} />
          <Route path="/expiring-plan" element={<ExpiringPlan />} />
          <Route path="/email" element={<Email />} />
          <Route path="/verify-attendance" element={<VerifyAttendance />} />
          <Route path="/modify-plan" element={<ModifyPlan />} />
          <Route path="/assign-file" element={<AssignFile />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
