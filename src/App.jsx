import ResponsiveAppBar from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import ApodPage from "./pages/apodPage";
import MarsRoverPage from "./pages/marsRoverPage";
import HomePage from "./pages/homePage";
import Login from "./components/Login";
import NASAFooter from "./components/Footer";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/";


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{minHeight:"100vh",display:'flex',flexDirection:'column'}}>
      {!isLoginPage && user &&<ResponsiveAppBar />}
      <Routes>
        <Route path="/" element={user? <Navigate to="/home"/>:<Login/> } />
        {user ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/apod" element={<ApodPage />} />
            <Route path="/mars" element={<MarsRoverPage />} />
          </>
        ):(
          <Route path="*" element={<Navigate to="/"/>} /> 
        )}
      </Routes>
      {!isLoginPage && user&&<NASAFooter />}
    </div>
  );
}

export default App;
