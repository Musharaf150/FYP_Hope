import CompaignsCollection from '@/components/shared/CompaignCollection';
import { getCompaignById, getRelatedCompaignByComCategory } from '@/lib/actions/compaign.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import React from 'react'

const CompaignDetails = async ({params:{ id }, searchParams}: SearchParamProps) => {
  const compaign = await getCompaignById(id);

  const relatedCompaigns = await getRelatedCompaignByComCategory({
    comCategoryId: compaign.comCategory._id,
    compaignId: compaign._id,
    page: searchParams.page as string,
  })
 

  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={compaign.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold'>{compaign.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {compaign.comCategory.name}
                </p>
              </div>
            </div>
          </div>

          {/* <CheckoutButton event={event} /> */}

          <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3'>
              <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
              <div className="p-medium-16 lg:p-regular-20 flex flex-col flex-wrap">
                <p>
                  {formatDateTime(compaign.startDateTime).dateOnly} - {''}
                  {formatDateTime(compaign.startDateTime).timeOnly}
                </p>
                
                <p>
                  {formatDateTime(compaign.endDateTime).dateOnly} - {''}
                  {formatDateTime(compaign.endDateTime).timeOnly}
                </p>
              </div>
            </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">Story: </p>
            <p className="p-medium-16 lg:p-regular-18">{compaign.description}</p>
           
          </div>

          <div className="mt-1">
                  <div className="flex items-center justify-between text-sm">
                      <span>Rs. {compaign.goal}</span>
                      <span className="text-gray-600">Required</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                      <span>Rs. 2,528,449</span>
                      <span className="text-gray-600">Raised</span>
                  </div>

              </div>
        </div>
        </div>
      </div>
    </section>

     {/* COMPAIGNS with the same category */}
     <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Related Compaigns</h2>

      <CompaignsCollection 
          data={relatedCompaigns?.data}
          emptyTitle="No Compaigns Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Compaigns"
          limit={3}
          page={1}
          totalPages={2}
        />
    </section>
    </>
    
  )
}

export default CompaignDetails
