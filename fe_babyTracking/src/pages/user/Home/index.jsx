import React from 'react'
import CarouselHero from '../../../components/Hero/CarouselHero'
import MembershipPage from '../Membership/MembershipPage'
import BMICalculator from './BMICalculator'
import DoctorIntro from './DoctorIntro'
import Testimonial from './Testimonial'

function HomePage() {
    return (
        <>
            <CarouselHero />
            <BMICalculator />
            <DoctorIntro />
            <Testimonial />
            <MembershipPage />
        </>
    )
}

export default HomePage