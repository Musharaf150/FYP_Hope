import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { ICompaign } from '@/lib/database/models/compaign.model'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import CompaignDonateButton from './CompaignDonateButton'

type CardProps = {
  compaign: ICompaign
}

const Card = ({ compaign}: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;



  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
          <div className="relative">
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">URGENT</div>
                          {compaign.isZakatEligible && (

<div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Zakat Eligible</div>
          )}
          </div>
     
      <Link 
        href={`/compaigns/${compaign._id}`}
        style={{backgroundImage: `url(${compaign.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 h-72"
      />

      

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
      <div className="flex gap-2">
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {compaign.comCategory.name}
          </p>
        </div>

        <div className='flex flex-col gap-2'>
        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(compaign.endDateTime).dateTime}
        </p>
    
        </div>

        

        <Link href={`/compaigns/${compaign._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{compaign.title}</p>
        </Link>

              <div className="mt-1">
                  <div className="flex items-center justify-between text-sm">
                      <span>Rs. {compaign.goal}</span>
                      <span className="text-gray-600">Required</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                      <span>Rs. 2,528</span>
                      <span className="text-gray-600">Raised</span>
                  </div>

              </div>

        <div className=" w-full">
          {/* <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {compaign.organizer.firstName} {compaign.organizer.lastName}

          </p>  */}
          <CompaignDonateButton compaign={compaign}/>
        </div>
      </div>
    </div>
  )
}

export default Card
