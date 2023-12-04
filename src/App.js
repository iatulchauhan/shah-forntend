import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Loader from './Components/Loader';
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <ThemeProvider theme={lightTheme}>
      <Loader />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
