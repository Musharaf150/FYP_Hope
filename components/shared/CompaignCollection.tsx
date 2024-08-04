import React from 'react'
import { ICompaign } from '@/lib/database/models/compaign.model'
import CompaignCard from './CompaignCard'




type CollectionProps = {
    data: ICompaign[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Compaign_Organized' | 'My_Compaigns' | 'All_Compaigns'
  }
  

const CompaignsCollection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
  }: CollectionProps) => {
  return (
    <>
    {data.length > 0 ? (
      <div className="flex flex-col items-center gap-10 px-5 sm:px-8 py-7 lg:py-12">
        <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {data.map((compaign) => {
            // const hasOrderLink = collectionType === 'Compaign_Organized';
            // const hidePrice = collectionType === 'My_Compaigns';

            return (
              <li key={compaign._id} className="flex justify-center">
                <CompaignCard compaign={compaign}/>
              </li>
            )
          })}
        </ul>

        {/* {totalPages > 1 && (
          <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
        )} */}
      </div>
    ): (
      <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
        <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
        <p className="p-regular-14">{emptyStateSubtext}</p>
      </div>
    )} 
  </>
  )
}

export default CompaignsCollection
