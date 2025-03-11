import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import TrustedBy from "./components/TrustedBy";

function App() {
  return (
    <div className="overflow-hidden">
      <NavBar />
      <Hero />
      <TrustedBy/>
    </div>
  );
}

export default App;
