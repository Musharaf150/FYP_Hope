import React, { FormEvent, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';


import { Button } from '../ui/button'
import { IEvent } from '@/lib/database/models/event.model'
import { checkoutOrder } from '@/lib/actions/order.actions';
import { createVolunteer } from '@/lib/actions/volunteer.actions';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({event, userId}: {event: IEvent, userId: string}) => {
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

    const onVolunteered = async (e:FormEvent) =>{
      e.preventDefault();

      const volunter = {
          eventTitle: event.title,
          eventId: event._id,
          volunteerId: userId
      }

      // await createVolunteer(volunter);
   
  }

  return (
    <>
    <form action={onCheckout} method='post'>
        <Button type='submit' role='link' size="lg" className='button sm:w-fit px-20'>
            {event.isFree ? "Get Ticket" : "Buy Ticket"}
        </Button>
    </form>
    <form onSubmit={onVolunteered} method='post'>
        <Button type='submit' role='link' size="lg" className='button sm:w-fit'>
            Become a Volunteer
        </Button>
    </form>
    </>
  )
}

export default Checkout
