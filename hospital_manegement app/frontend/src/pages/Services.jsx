

import React from 'react'
import { services } from '../assets/data/services'
import ServiceCart from '../components/Service/ServiceCart'

const Services = () => {
  return (
    
      <div>
    <div className="container">
    <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {services.map((item, index) => (
        <ServiceCart item={item} index={index} key={index} />
      ))}
    </div>
    </div>
  </div>
   
  )
}

export default Services

