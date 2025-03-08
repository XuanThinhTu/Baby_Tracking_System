import React from 'react'
import CarouselHero from '../../../components/Hero/CarouselHero'
import MembershipPage from '../Membership/MembershipPackages'
import BMICalculator from './BMICalculator'
import DoctorIntro from './DoctorIntro'
import Testimonial from './Testimonial'
import FAQ from './FAQ'

function HomePage() {
    return (
        <>
            <CarouselHero />
            <BMICalculator />
            <DoctorIntro />
            <Testimonial />
            <FAQ />
            <MembershipPage />
        </>
    )
}

export default HomePage