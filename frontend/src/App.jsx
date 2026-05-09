import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomeFeed from "./pages/HomeFeed";
import MyPosts from "./pages/MyPosts";
import DoneForToday from "./pages/DoneForToday";
import MoodCheckIn from "./components/MoodCheckIn";
import Navbar from "./components/Navbar";
import { authApi } from "./lib/api";

export default function App() {
  const [page, setPage] = useState("landing"); // landing | login | register | home | my-posts | done
  const [user, setUser] = useState(null); // { id, username, email, token }
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sessionStart] = useState(Date.now());

  // Restore user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("hs_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("hs_user", JSON.stringify(userData));
    // Show mood check-in once per session
    const checkedIn = sessionStorage.getItem("hs_mood_checked");
    if (!checkedIn) setShowMoodCheckIn(true);
    else setPage("home");
  };

  const handleLogout = async () => {
    try {
      if (user?.token) {
        await authApi.logout(user.token);
      }
    } catch (_error) {
      // Allow local logout even if backend call fails
    } finally {
      setUser(null);
      localStorage.removeItem("hs_user");
      setPage("landing");
    }
  };

  const handleMoodSelect = (mood) => {
    sessionStorage.setItem("hs_mood_checked", "1");
    setShowMoodCheckIn(false);
    if (mood === "low") {
      setCategoryFilter(3);
    } else if (mood === "okay") {
      setCategoryFilter(3);
    } else {
      setCategoryFilter("all");
    }
    setPage("home");
  };

  const navigate = (p) => setPage(p);

  // Pages that show the navbar
  const showNav = ["home", "my-posts"].includes(page) && user;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {showMoodCheckIn && <MoodCheckIn onSelect={handleMoodSelect} />}

      {showNav && (
        <Navbar
          user={user}
          page={page}
          navigate={navigate}
          onLogout={handleLogout}
          sessionStart={sessionStart}
        />
      )}

      {page === "landing" && <LandingPage navigate={navigate} user={user} />}
      {page === "login" && (
        <LoginPage navigate={navigate} onLogin={handleLogin} />
      )}
      {page === "register" && (
        <RegisterPage navigate={navigate} onLogin={handleLogin} />
      )}
      {page === "home" && (
        <HomeFeed
          user={user}
          navigate={navigate}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sessionStart={sessionStart}
        />
      )}
      {page === "my-posts" && <MyPosts user={user} navigate={navigate} />}
      {page === "done" && (
        <DoneForToday navigate={navigate} sessionStart={sessionStart} />
      )}
    </div>
  );
}
