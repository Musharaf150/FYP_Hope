import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button'
import { getVolunteerByUser } from '@/lib/actions/volunteer.actions';
import { IVolunteer } from '@/lib/database/models/volunteer.model';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link'

const VolunteeredEvents = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const volunteersPage = Number(searchParams?.ordersPage) || 1;
    const volunteers = await getVolunteerByUser({ userId, page: volunteersPage})

    const volunteeredEvents = volunteers?.data.map((volunteer: IVolunteer) => volunteer.event) || [];


  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Volunteered Events</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={volunteeredEvents}
          emptyTitle="No event Volunteered yet"
          emptyStateSubtext="No worries - plenty of exciting events to Volunteered!"
          collectionType="My_Tickets"
          limit={3}
          page={volunteersPage}
          urlParamName="ordersPage"
          totalPages={volunteers?.totalPages}
        />
      </section>
    </>
  )
}

export default VolunteeredEvents
