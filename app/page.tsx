import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import Feed from "./components/feed/feed"
import Schedule from "./components/schedule/schedule"
import Playground from "./components/playground/playground"
import Footer from "./components/footer/footer"

export default function Home() {
  return (
    <>
    <Navbar />
    <main>
      
      <Hero />
      <About />
      <Feed/>
      <Schedule />
      <Playground />
    </main>
    <Footer />

    </>
  );
}


