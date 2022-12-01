import Home from "./pages/Home/Home";
import Login   from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
// import Topbar from "../src/components/topbar/Topbar";
function App() {
  const {user} = useContext(AuthContext);
  return (
      <div className="app">
        <Router>
        
          <Routes>
            <Route exact path = "/" element = {user ? <Home /> : <Register />} />
          </Routes>

          <Routes>
            <Route path = "/login" element={ user ? <Navigate to="/" /> : <Login />} />
          </Routes>

          <Routes>
            <Route path = "/register" element={user ? <Navigate to="/" /> : <Register/>} />
          </Routes>

          <Routes>
            <Route path = "/profile/:username" element={user ? <Profile/> : <Register/>}/>
          </Routes>

        </Router>
      </div>
  );
}

export default App;
