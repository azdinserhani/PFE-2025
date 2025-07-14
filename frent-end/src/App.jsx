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
import EditCourse from "./pages/InstroctorDashbaord/EditCourse";
import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTop from "./components/Layout/ScrollToTop";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { useTranslation } from "react-i18next";
import CreateExam from "./pages/InstroctorDashbaord/CreateExam";
import ExamPage from "./pages/ExamPage";
import CertificatePage from "./pages/CertificatePage";
import './i18n';
import './styles/rtl.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => ({
    user: state.user,
  }));
  

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
            <Route path="/create-exam/:id" element={<CreateExam />} />
            <Route path="/exam/:id" element={<ExamPage />} />
            <Route path="/certificate/:id" element={<CertificatePage />} />
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
              path="/instructor/edit-course/:courseId"
              element={
                <ProtectedRoute>
                  <EditCourse />
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
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Get the stored language or default to 'en'
    const currentLanguage = localStorage.getItem('i18nextLng') || 'en';
    
    // Set the language
    i18n.changeLanguage(currentLanguage);
    
    // Set the direction based on the language
    const dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    
  }, []); // Empty dependency array for initial load

  // Watch for language changes
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
  }, [i18n.language]);

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
