import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import UserModal from "./components/UserModal";

function App() {

    useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.09,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserModal />} />
         <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;