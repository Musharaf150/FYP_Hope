import React, { FormEvent, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';


import { Button } from '../ui/button'
import { IEvent } from '@/lib/database/models/event.model'
import { checkoutOrder } from '@/lib/actions/order.actions';
import { createVolunteer, hasVolunteered } from '@/lib/actions/volunteer.actions';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({event, userId}: {event: IEvent, userId: string}) => {
  const [hasApplied, setHasApplied] = useState<Record<string, boolean | undefined>>({});
  const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);

      useEffect(() => {
        const checkVolunteerStatus = async () => {
          setLoading(true);
          try {
            const applied = await hasVolunteered(userId, event._id);
            console.log('Volunteer status fetched for event:', event._id, applied);
            setHasApplied((prev) => ({ ...prev, [event._id]: applied }));
          } catch (error) {
            console.error('Error checking volunteer status:', error);
            setHasApplied((prev) => ({ ...prev, [event._id]: false })); // Handle error case
          }
          setLoading(false);
        };
        checkVolunteerStatus();
      }, [userId, event._id]);
    

    const onCheckout = async () =>{
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId
        }

        await checkoutOrder(order);
     
    }

    const onVolunteered = async (e: FormEvent) => {
      e.preventDefault();
  
      try {
        const volunteer = {
          eventTitle: event.title,
          eventId: event._id,
          participantId: userId
        };
  
        await createVolunteer(volunteer);
        setHasApplied((prev) => ({ ...prev, [event._id]: true }));// Update state for this event
      } catch (error) {
        console.error('Error creating volunteer:', error);
      }
    };

    const eventHasApplied = hasApplied[event._id] ?? false; // Default to false if undefined
  return (
    <>
    <form action={onCheckout} method='post'>
        <Button type='submit' role='link' size='lg' className='button sm:w-fit lg:px-16'>
            {event.isFree ? "Get Ticket" : "Buy Ticket"}
        </Button>
    </form>
    <form onSubmit={onVolunteered} method='post'>
        <Button type='submit' size="sm" className='button sm:w-fit' disabled={eventHasApplied}>
        {eventHasApplied ? "You have applied" : "Become a Volunteer"}
        </Button>
    </form>
    </>
  )
}

export default Checkout
