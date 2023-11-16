import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import GamesPage from "./pages/GamesPage/GamesPage";
import { useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";

function App() {
  const token = useSelector((state) => state.user.token);
  return (
    <>
      <main>
        <Routes>
          <Route path="*" element={token ? <Navigate to="/games" /> : <Navigate to="/login" />} />
          <Route path="/login" element={token ? <Navigate to="/games" /> : <LoginPage />} />
          <Route
            path="/games"
            element={
              <Auth>
                <GamesPage />
              </Auth>
            }
          />
        </Routes>
      </main>
      <footer className="main-footer">Designed & created by Polad Mamedov 2023</footer>
    </>
  );
}

export default App;
