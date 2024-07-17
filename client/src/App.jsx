import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/Search/Search";
import Layout from "./pages/Layout/Layout";
import Post from "./pages/Post/Post";

export default function App() {
  return (
    <Routes>
      {/* Main app layout */}
      <Route path="/" element={<Layout />}>
        <Route index Component={Home}/>
        <Route path="/profile" Component={Profile} />
        <Route path="/profile/:userId" Component={Profile} />
        <Route path="/create" Component={CreatePost}/>
        <Route path="/search" Component={Search}/>
      </Route>
      {/* Different layouts */}
      <Route path="/login" Component={Login}/>
      <Route path="/register" Component={Register}/>
      <Route path="/profile/edit" Component={ProfileEdit}/>
      <Route path="/post/:postId" Component={Post}/>
    </Routes>
  )
}

