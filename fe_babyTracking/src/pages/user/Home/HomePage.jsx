import React from 'react'
import CarouselHero from '../../../components/Hero/CarouselHero'
import MembershipPage from '../Membership/MembershipPage'
import BMICalculator from './BMICalculator'

function HomePage() {
    return (
        <>
            <CarouselHero />
            <BMICalculator />
            <MembershipPage />
        </>
    )
}

export default HomePage