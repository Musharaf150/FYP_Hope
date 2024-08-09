import CompaignsCollection from '@/components/shared/CompaignCollection'
import RaisedDonation from '@/components/shared/RaisedDonation'
import { Button } from '@/components/ui/button'
import {getRaisedByUser } from '@/lib/actions/comraised.actions'
import { IComRaised } from '@/lib/database/models/comraised.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'


const MyCampaignPage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const raisedPage = Number(searchParams?.raisedPage) || 1;

  const raised = await getRaisedByUser({ userId, page: raisedPage})

  const comRaised = raised?.data.map((comraised: IComRaised) => comraised.compaign) || [];
  
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Compaigns Donated</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#compaigns">
            Explore More Compaigns
            </Link>
          </Button>
        </div>
      </section>
      <RaisedDonation searchParams={{
        donorId: userId,
        query: ''
      }}/>

      <section className="wrapper my-8">
        <CompaignsCollection
          data={comRaised}
          emptyTitle="No Compaigns have been donated yet"
          emptyStateSubtext="Go Donate some now"
          collectionType="My_Compaigns"
          limit={6}
          page={raisedPage}
          urlParamName="comraisedsPage"
          totalPages={raised?.totalPages}
        />
      </section>
    </>
  )
}


export default MyCampaignPage