import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/Search/Search";
import Layout from "./layouts/Layout/Layout";
import Post from "./pages/Post/Post";
import NotFound from "./pages/NotFound/NotFound";
import useAuthenticate from "./entities/users/hooks/useAuthenticate";
import Notifications from "./pages/Notifications/Notifications";

export default function App() {
  // App entry point - handle authentication
  useAuthenticate();

  return (
    <Routes>
      {/* Main app layout */}
      <Route path="/" element={<Layout />}>
        <Route index Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/profile/:userId" Component={Profile} />
        <Route path="/create" Component={CreatePost} />
        <Route path="/search" Component={Search} />
        <Route path="/notifications" Component={Notifications} />
      </Route>

      {/* Different layouts */}
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/profile/edit" Component={ProfileEdit} />
      <Route path="/post/:postId" Component={Post} />
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}
