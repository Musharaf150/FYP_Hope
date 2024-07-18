"use client"


import { SignedIn, useUser } from '@clerk/nextjs'
import React from 'react'
import { ITotaldonation } from '@/lib/database/models/totaldonation.model'
import DonationButton from './DonationButton'

const DonationProcess = ({donor}:{ donor: ITotaldonation}) => {
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;


  return (
    <div className=''>
        
                <>
                <SignedIn>
                    <DonationButton donor={donor} userId={userId}/>
                </SignedIn>
                </>
            
    </div>
  )
}

export default DonationProcess
