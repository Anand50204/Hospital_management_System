import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctores from '../components/TopDoctores'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
    <Header/>
    <SpecialityMenu/>
    <TopDoctores/>
    <Banner/>
    </div>
  )
}

export default Home
