import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { QuoteProvider } from "@/context/QuoteContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Home from "@/pages/Home";
import Water from "@/pages/Water";
import DeliveryAreas from "@/pages/DeliveryAreas";
import Events from "@/pages/Events";
import Gallery from "@/pages/Gallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import { DeliveryPolicy, Privacy, Terms } from "@/pages/Legal";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <QuoteProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/water" element={<Water />} />
            <Route path="/delivery-areas" element={<DeliveryAreas />} />
            <Route path="/events-bulk" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/delivery-policy" element={<DeliveryPolicy />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
          <WhatsAppFloat />
          <Toaster theme="dark" position="bottom-center" richColors />
        </QuoteProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
