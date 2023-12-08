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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
