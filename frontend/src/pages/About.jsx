import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className=' text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className=' text-gray-700 font-medium'>US</span></p>
      </div>
      <div className=' my-10 flex flex-col md:flex-row gap-12'>
        <img className=' w-full max-w-[360px]' src={assets.about_image} alt="" />
        <div className=' flex flex-col justify-center gap-6 md:w'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quam recusandae, asperiores suscipit eveniet voluptatibus reprehenderit obcaecati quia, quo facere, repellendus sequi? Id mollitia qui illo obcaecati ratione laudantium dolores?</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui cumque aliquam itaque recusandae quam aut assumenda minus eos reprehenderit nihil ipsam non distinctio fuga libero, sequi ut velit? Voluptas, odit!</p>
          <b className=' text-gray-800'>Our vision</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, sed? Obcaecati labore libero facere corrupti veritatis earum fugiat doloribus incidunt beatae accusantium cumque iste molestias explicabo provident, maxime suscipit animi?</p>
        </div>
      </div>

      <div className=' text-xl my-4'>
        <p>WHY <span className=' text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className=' flex flex-col md:flex-row mb-20 '>
        <div className=' border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[12px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIANCY:</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam quos id nobis, optio cumque laborum </p>
        </div>
        <div className=' border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[12px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam quos id nobis, optio cumque laborum</p>
        </div>
        <div className=' border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[12px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam quos id nobis, optio cumque laborum</p>
        </div>
      </div>
      
    </div>
  )
}

export default About
