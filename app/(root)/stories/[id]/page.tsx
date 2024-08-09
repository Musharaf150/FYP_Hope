import { getRelatedStoryByComCategory, getStoryById } from '@/lib/actions/successstory.actions';
import { SearchParamProps } from '@/types';
import StoriesCollections from '@/components/shared/StoriesCollections';
import Image from 'next/image';
import React from 'react'

const StoryDetails = async ({params:{ id }, searchParams}: SearchParamProps) => {
  const story = await getStoryById(id);

  const relatedstories = await getRelatedStoryByComCategory({
    comCategoryId: story.comCategory._id,
    storyId: story._id,
    page: searchParams.page as string,
  })
 

  return (
    <>
    <section className="sm:py-8 flex justify-center bg-primary-50 bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={story.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center rounded-md"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold'>{story.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {story.comCategory.name}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">Story: </p>
            <p className="p-medium-16 lg:p-regular-18">{story.description}</p>
           
        </div>
        </div>
        </div>
      </div>
    </section>

     {/* COMPAIGNS with the same category */}
     <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Related Stories</h2>

     <StoriesCollections 
      data={relatedstories?.data} 
      emptyTitle = "No Stories Founds"
      emptyStateSubtext="Come Back Later"
      collectionType="All_Stories"
      limit={3}
      page={1}
      totalPages={2}/>
    </section>
    </>
    
  )
}

export default StoryDetails
