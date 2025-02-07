import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VenuePage from "./pages/VenuePage";
import PageNotFound from "./pages/PageNotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import useAuthStore from "./js/store/useAuthStore";
import CreateVenuePage from "./pages/CreateVenuePage";
import UpdateVenuePage from "./pages/updateVenuePage";

export default function App() {
  const { user } = useAuthStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/venue/:id" element={<VenuePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-venue/:id" element={<UpdateVenuePage />} />
          <Route
            path="/create-venue"
            element={
              user.data.venueManager ? <CreateVenuePage /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
