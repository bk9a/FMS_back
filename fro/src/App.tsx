import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
//importing react slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { animateScroll } from "react-scroll";
import NavBar from "./components/organs/NavBar";
import Home from "./components/pages/Home";
import Footer from "./components/organs/Footer";

function App() {
  const directory = useLocation();
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
    });
  }, [directory.pathname]);

  return (
    <div className="w-full h-full bg-zinc-900 font-nunito relative">
    
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Home />} />
      </Routes>
=======
<<<<<<< HEAD
        <Route path="/cal" element={<Cal />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
=======
        <Route path="/" element={<Home />} />
      </Routes>
>>>>>>> Stashed changes
      <Footer />
    </div>
  )
>>>>>>> 729e97c500518b3ebbe355a9d0d6567932a5f048
}

export default App;
