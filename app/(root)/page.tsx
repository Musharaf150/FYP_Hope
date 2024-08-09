import { Button } from "@/components/ui/button";
import Collection from '@/components/shared/Collection';
import Image from "next/image";
import Link from "next/link";
import { getAllEvents } from '@/lib/actions/event.actions';
import Services from "@/components/shared/Services";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { getAllCompaigns } from "@/lib/actions/compaign.actions";
import CompaignCollection from "@/components/shared/CompaignCollection";
import ComCategoryFilter from "@/components/shared/ComCategoryFilter";
import CamSearch from "@/components/shared/CamSearch";


export default async function Home({searchParams}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const eventsearchText = (searchParams?.query as string) ||" ";
  const category = (searchParams?.category as string) || '';
  const compaignsearchText = (searchParams?.camquery as string) ||" ";
  const comCategory = (searchParams?.comCategory as string) || '';


  const events = await getAllEvents({
    query:eventsearchText,
    category,
    page,
    limit: 6
  });

  const compaigns = await getAllCompaigns({
    camquery:compaignsearchText,
    comCategory,
    page,
    limit: 6
  });

 


  return (
    <>
    <section className=" bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2
      2xl:gap-0">
        <div className=" flex flex-col justify-center gap-8">
          <h1 className="h1-bold justify-start pr-4">Welcome to the Hope Foundation</h1>
          <p className="p-regular-20 md:p-regular-24">Our work aims to break the vicious cycle of poverty and social isolation and to restore hope for a better future.</p>
          
          <Button size="lg" asChild className="button w-full sm:w-fit">
            <Link href="/donate">
            Donate Now
            </Link>
          </Button>

        </div>

        <Image 
        src="/assets/images/hero.png"
        alt="hero"
        width={1000}
        height={1000}
        className="max-h-[70vh] object-contain object-center
        2xl:max-h-[50vh]"/>

      </div>
    </section>
    <Services />

    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search/>
          <CategoryFilter/>
        </div>
        
        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />

        </section>

  

<section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Thousands of Compaigns</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CamSearch/>
          <ComCategoryFilter/>
        </div>
        
        <CompaignCollection
          data={compaigns?.data}
          emptyTitle="No Campaigns Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Compaigns"
          limit={6}
          page={page}
          totalPages={compaigns?.totalPages}
        />

        </section>
    </>
  )
}
