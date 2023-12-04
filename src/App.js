import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Loader from './Components/Loader';

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <Loader />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
