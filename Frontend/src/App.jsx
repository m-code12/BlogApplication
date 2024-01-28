import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import UpdateBlog from "./pages/update/UpdateBlog";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route
          path="/register"
          element={user ? <Homepage></Homepage> : <Register />}
        ></Route>
        <Route
          path="/login"
          element={user ? <Homepage /> : <Login></Login>}
        ></Route>
        <Route exact path="/" element={user ? <Homepage /> : <Login />}></Route>
        <Route path="/posts" element={user ? <Homepage /> : <Login />}></Route>
        <Route
          path="/post/:id"
          element={user ? <Single /> : <Login></Login>}
        ></Route>
        <Route
          path="/write"
          element={user ? <Write></Write> : <Login />}
        ></Route>
        {/* <Route path="/settings" element={<Settings />}></Route> */}
        <Route
          path="/update/:id"
          element={user ? <UpdateBlog /> : <Login></Login>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
