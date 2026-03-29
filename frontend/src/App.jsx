import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VolunteerRegistration from "./pages/VolunteerRegistration";
import ContactUs from "./pages/ContactUS";
import AboutUs from "./pages/AboutUs";
import UnderDevelopment from "./pages/UnderDevelopment";
import ProgramsPage from "./pages/ProgramsPage";
import TeamGallery from "./pages/TeamGallery";
import ScrollToTop from "./components/ScrollToTop";
import Donate from "./pages/Donate";

function App() {
  return (
    <div className="app-layout">
      <Navbar />

      {/* ScrollToTop should be outside Routes */}
      <ScrollToTop />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-involved" element={<VolunteerRegistration />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/gallery" element={<TeamGallery />} />
          <Route path="/donate" element={<Donate />} />

          <Route path="*" element={<UnderDevelopment />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
