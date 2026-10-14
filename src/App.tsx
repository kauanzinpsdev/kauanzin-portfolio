import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Journey from "./sections/Journey";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Technologies from "./sections/Technologies";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Journey />
        <Services />
        <Projects />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
