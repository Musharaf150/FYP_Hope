import ComCategoryFilter from '@/components/shared/ComCategoryFilter'
import Search from '@/components/shared/Search';
import StoriesCollections from '@/components/shared/StoriesCollections';
import { getAllStories } from '@/lib/actions/successstory.actions';
import { SearchParamProps } from '@/types';
import React from 'react'

const SucceStories = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const storysearchText = (searchParams?.query as string) ||" ";
  const comCategory = (searchParams?.comCategory as string) || '';

  const story = await getAllStories({
    query:storysearchText ,
    comCategory,
    page,
    limit: 6
  });



  return (
    <section id="story" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Success Stories</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search/>
          <ComCategoryFilter/>
        </div>
        
        <StoriesCollections
          data={story?.data}
          emptyTitle="No Stories Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Stories"
          limit={6}
          page={page}
          totalPages={story?.totalPages}
        />

        </section>
  )
}

export default SucceStories
