import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/home/Home";
import Auth from "./components/pages/auth/Auth";
import Messages from "./components/pages/messages/Messages";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={user ? <Home /> : <Auth />} />
          <Route path="/messages" element={user ? <Messages /> : <Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
