import { serviceCardProps } from '@/types'
import React from 'react'

const ServiceCard = ({title, icon, bgColor}:serviceCardProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${bgColor} rounded-lg text-white h-full`}>
    <div className="flex items-center justify-center mb-4" style={{ height: '50px', width: '30px' }}>
      <span className="text-4xl" role="img" aria-label="icon">{icon}</span>
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
  </div>
  )
}

export default ServiceCard
