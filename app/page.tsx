import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import Events from "./components/events/events"
import Moments from "./components/moments/moments"
import Playground from "./components/playground/playground"
import Footer from "./components/footer/footer"

export default function Home() {
  return (
    <>
    <Navbar />
    <main>
      
      <Hero />
      <About />
      <Events />
      <Moments />
      <Playground />
    </main>
    <Footer />

    </>
  );
}


