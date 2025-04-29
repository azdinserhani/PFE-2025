import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./components/Layout/NavBar";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import HomeLayout from "./components/Layout/HomeLayout";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import MyProfile from "./pages/MyProfile";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MyLearning from "./pages/MyLearning";
import DashBoardLayout from "./components/Layout/DashBoardLayout";
import InstructorPageInfo from "./pages/InstructorPageInfo";
import PlayCourse from "./pages/PlayCourse/PlayCourse";
import CourseByInstructor from "./pages/InstroctorDashbaord/CourseByInstructor";
import Analytics from "./pages/InstroctorDashbaord/Analytics";
import CreateCourse from "./pages/InstroctorDashbaord/CreateCourse";
import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTop from "./components/Layout/ScrollToTop";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  // Check if the user is authenticated
  if (user == null) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/Signin" replace />;
  }

  // Render the children if authenticated
  return children;
};

const RedirectRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Check if the user is authenticated
  if (user != null) {
    // Redirect to the dashboard if authenticated
    return <Navigate to="/" replace />;
  }

  // Render the children if not authenticated
  return children;
};

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/instructor/:id" element={<InstructorPageInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/myProfile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myLearning"
              element={
                <ProtectedRoute>
                  <MyLearning />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/learn/:id"
              element={
                <ProtectedRoute>
                  <PlayCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructorCourse"
              element={
                <ProtectedRoute>
                  <CourseByInstructor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/create-course"
              element={
                <ProtectedRoute>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/Signup"
            element={
              <RedirectRoute>
                <SignUp />
              </RedirectRoute>
            }
          />
          <Route
            path="/Signin"
            element={
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            }
          />
          <Route
            path="/forgetPassword"
            element={
              <RedirectRoute>
                <ForgetPassword />
              </RedirectRoute>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="">
        <ScrollToTop />
        <AnimatedRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
