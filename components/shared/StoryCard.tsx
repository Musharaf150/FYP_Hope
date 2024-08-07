import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { IStory } from '@/lib/database/models/successstory.model'

type CardProps = {
  story: IStory,
}

const Card = ({ story}: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;


  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/stories/${story._id}`}
        style={{backgroundImage: `url(${story.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 h-56"
      />
  
      

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
       <div className="flex gap-2">
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {story.comCategory.name}
          </p>
        </div>


        <Link href={`/stories/${story._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{story.title}</p>
        </Link>
        <p className='flex justify-center text-gray-500'>
            {story.description?.substring(0,200)}...
          </p>

      </div>
    </div>
  )
}

export default Card
