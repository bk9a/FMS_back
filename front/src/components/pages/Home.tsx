import About from "../organs/About.tsx"
import Blogs from "../organs/Blogs.tsx"
import Calculator from "../organs/Calculator.tsx"
import Contact from "../organs/Contact.tsx"
import HeroSection from "../organs/HeroSection.tsx"
import Membership from "../organs/Membership.tsx"
import Offers from "../organs/Offers.tsx"
import Testimonials from "../organs/Testimonials.tsx"

import React from 'react';

const Home = () => {
    return (
        <>
            <HeroSection />
            <About />
            <Offers />
            <Membership />
            <Calculator />
            <Testimonials />
            <Blogs />
            <Contact />
        </>
    )
}

export default Home