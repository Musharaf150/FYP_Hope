"use client"


import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'
import { ICompaign } from '@/lib/database/models/compaign.model'
import { Sign } from 'crypto'
import DonateClick from './DonateClick'

const CompaignDonationButton = ({compaign}:{ compaign: ICompaign}) => {
    const hasEventFinished = new Date(compaign.endDateTime) < new Date();
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;


  return (
    <div className='flex items-center gap-3'>
        {/* Cannot buy past events */}
        {
            hasEventFinished ? (
                <p className='p-2 text-red-400'>Sorry, Compaign are no longer available.</p>
            ): (
                <>
                <SignedIn>
                    <DonateClick compaign={compaign} userId={userId}/>
                </SignedIn>
                </>
            )
        }
      
    </div>
  )
}

export default CompaignDonationButton
