import { BrowserRouter as Router, Routes, Route } from "react-router";
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
function App() {

  
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/instructor/:id" element={ <InstructorPageInfo /> } />
          <Route path="/cart" element={ <Cart /> } />
        </Route>
        <Route path="/" element={<DashBoardLayout />}>
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/myLearning" element={<MyLearning />} />
          <Route path="/course/learn/:id" element={<PlayCourse />} />
          <Route path="/instructorCourse" element={<CourseByInstructor />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/instructor/create-course" element={<CreateCourse/>} />
        </Route>

        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Signin" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
