import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
   <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} className='mb-6 w-40' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>
        Foodie is dedicated to serving fresh, high-quality meals that combine taste and convenience. With a carefully curated menu and reliable delivery, we make it easier than ever to enjoy delicious food anytime, anywhere.
        </p>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>011-25-34-355</li>
            <li>contact@foodie.com</li>
        </ul>
      </div>

    </div>

    <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ foodie.com - All Right Reserved</p>
    </div>


   </div>
  )
}

export default Footer
