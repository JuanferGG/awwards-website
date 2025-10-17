import About from "./components/About";
import { Hero } from "./components/Hero";
import NavBar from "./components/NavBar";


function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-300">
      <NavBar />
      <Hero />
      <About />
    </main>
  );
}

export default App;
