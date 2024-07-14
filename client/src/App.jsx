import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} exact/>
        <Route path="/login" Component={Login}/>
      </Routes>
    </BrowserRouter>
  )
}

