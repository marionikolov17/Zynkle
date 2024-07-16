import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/Search/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} exact/>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>
        <Route path="/profile" Component={Profile} />
        <Route path="/profile/edit" Component={ProfileEdit}/>
        <Route path="/create" Component={CreatePost}/>
        <Route path="/search" Component={Search}/>
      </Routes>
    </BrowserRouter>
  )
}

