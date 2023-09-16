import About from "../organs/About"
import Blogs from "../organs/Blogs"
import Calculator from "../organs/Calculator"
import Contact from "../organs/Contact"
import Footer from "../organs/Footer"
import HeroSection from "../organs/HeroSection"
import Membership from "../organs/Membership"
import NavBar from "../organs/NavBar"
import Offers from "../organs/Offers"
import Testimonials from "../organs/Testimonials"


const Home = () => {
    return (
        <>
            <NavBar />
            <HeroSection />
            <About />
            <Offers />
            <Membership />
            <Calculator />
            <Testimonials />
            <Blogs />
            <Contact />
            <Footer />
        </>
    )
}

export default Home