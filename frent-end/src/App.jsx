import Features from "./components/Features";
import Hero from "./components/Hero";
import Info from "./components/Info";
import NavBar from "./components/NavBar";
import NewsLettre from "./components/NewsLettre";
import TrustedBy from "./components/TrustedBy";

function App() {
  return (
    <div className="lg:max-w-7xl lg:mx-auto overflow-hidden my-auto">
      <NavBar />
      <Hero />
      <TrustedBy />
      <Info />
      <Features />
      <NewsLettre />
    </div>
  );
}

export default App;
