"use client"

import { Button } from '@/components/ui/button'
import TestDonate from '@/components/TestDonate'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useUser } from '@clerk/nextjs'

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Donate = () => {
  const {user} = useUser();
  const userId = user?.publicMetadata.userId as string;



  return (
    <div>
      <section className=" bg-primary-50 h-screen bg-contain py-5 md:py-10">
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2
      2xl:gap-0">
        <div className=" flex flex-col justify-center gap-8">
          <h1 className="h1-bold justify-start pr-4">Donate for a Good Cause</h1>
          <p className="p-regular-20 md:p-regular-24">Our work aims to break the vicious cycle of poverty and social isolation and to restore hope for a better future.</p>
          {/* <Link href='https://buy.stripe.com/test_14kdSMd2Jg522ru7t9'>
          <Button size='lg' className="">Donate Now</Button>
          </Link> */}
          <TestDonate userId={userId}/>

        </div>
        <Image 
        src="/assets/images/file.png"
        alt="hero"
        width={1000}
        height={1000}
        className="max-h-[70vh] object-contain object-center
        2xl:max-h-[50vh] bg-transparent border-none shadow-none"/> 
      </div>
    </section>
    </div>
  )
}

export default Donate
