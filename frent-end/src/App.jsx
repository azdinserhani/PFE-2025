import NavBar from "./components/Layout/NavBar";
import CoursePage from "./pages/CoursePage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="lg:max-w-7xl lg:mx-auto overflow-hidden my-auto">
      <NavBar />
      {/* <LandingPage /> */}
      <CoursePage />
    </div>
  );
}

export default App;
