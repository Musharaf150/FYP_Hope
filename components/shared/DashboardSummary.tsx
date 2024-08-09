
import Card from './Card'; // Adjust path as needed
import { getAllDonationByUser } from '@/lib/actions/totaldonation.actions'; // Adjust import path
import { CalendarDays, CalendarSearch, Caravan, DollarSign } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { getVolunteerByUser } from '@/lib/actions/volunteer.actions';
import { getRaisedByUser } from '@/lib/actions/comraised.actions';


const DashboardSummary = async () => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const { totalAmount } = await getAllDonationByUser(userId)

  //fetch Total event participation
   const ordersResponse = await getOrdersByUser({ userId });
  if (!ordersResponse) {
    throw new Error('Failed to fetch orders by user');
  }
  const { ordersCount } = ordersResponse;

  //fetch total volunteered events
  const volunteerResponse = await getVolunteerByUser({userId,page:1})
  if(!volunteerResponse){
    throw new Error('Failed to fetch Volunteered events by User')
  }
  const {volunteersCount} = volunteerResponse

  const campaignCount = await getRaisedByUser({userId,page:1})
  if(!campaignCount){
    throw new Error('Failed to fetch Donated Campaigns by User')
  }
  const {raisedCount} = campaignCount;



  const data = [
    {
      label: "Total Donations",
      amount: `PKR ${totalAmount.toLocaleString()}`,
      icon: DollarSign,
      route: '/dashboard/donationhistory'
    },
    {
      label: "Participated Events",
      amount: ordersCount.toString(),
      icon: CalendarDays,
      route: '/dashboard/mytickets'
    },
    {
      label: "Donated Campaigns",
      amount: raisedCount.toString(),
      icon: Caravan,
      route: '/dashboard/mycampaigns'
    },
    {
      label: "Volunteered Events",
      amount: volunteersCount.toString(),
      icon: CalendarSearch,
      route: '/dashboard/volunteered'
    },
  ];

  return (
    <section className='grid w-full grid-cols-1 gap-4 gap-x-4 transition-all
      sm:grid-cols-2 xl:grid-cols-4'>
      {data.map((item, index) => (
        <Card
          key={index}
          label={item.label}
          amount={item.amount}
          icon={item.icon}
          route={item.route}
        />
      ))}
    </section>
  );
};

export default DashboardSummary;
