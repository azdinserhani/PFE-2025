import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="lg:max-w-7xl lg:mx-auto overflow-hidden my-auto">
      <NavBar />
      <LandingPage />
    </div>
  );
}

export default App;
