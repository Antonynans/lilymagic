import { useState } from "react";
import { Cursor } from "../components/Cursor";
import { Loader } from "../components/Loader";
import { PageTransition } from "../components/PageTransition";
import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { Work } from "../components/Work";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <Loader onDone={() => setLoaderDone(true)} />
      <PageTransition />
      <Nav />

      <div
        id="scroll-container"
        data-scroll-container
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
      >
        <div style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
          <Hero loaderDone={loaderDone} />
        </div>

        <div
          style={{ scrollSnapAlign: "start" }}
          className="pt-[80px] sm:pt-[88px]"
        >
          <Marquee />
          <Work />
          <About />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
