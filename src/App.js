import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PrivateRoute from "./Routes/PrivateRoute";
//pages
import Home from "./pages/Home";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Listing from './pages/Listing';
import ViewListing from './pages/ViewListing';
import Contact from './pages/Contact';
import About from './pages/About';
import Support from './pages/Support';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/listing" element={<PrivateRoute><Listing /></PrivateRoute>} />
        <Route path="/view-listing" element={<PrivateRoute><ViewListing /></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />

        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
