import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import { ToastContainer, theme } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeProvider, createTheme  } from '@mui/material/styles';
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
import ChangePassword from './pages/ChangePassword';
import NotFound from './pages/NotFound';
import Portal from './pages/Portal';
import Profile from './pages/Profile';
import AddUser from './pages/AddUser';
import ResetPassword from './pages/ResetPassword';

const muiTheme = createTheme ({
  typography: {
    "fontFamily": `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
    "fontSize": 13,
    "lineHeight": 28,
    "fontWeightLight": 400,
    "fontWeightRegular": 400,
    "fontWeightMedium": 400
   }
});

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
    <SkeletonTheme highlightColor='#525252' borderRadius="0.5rem" height={10}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/listing" element={<PrivateRoute><Listing /></PrivateRoute>} />
          <Route path="/view-listing" element={<PrivateRoute><ViewListing /></PrivateRoute>} />
          <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          <Route path="/add-user" element={<PrivateRoute><AddUser /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />

          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/portal" element={<ProtectedRoute><Portal /></ProtectedRoute>} />
          <Route path="/reset-password/:token" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme={"colored"}
        />
      </BrowserRouter>
    </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;
