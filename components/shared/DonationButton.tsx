import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { ITotaldonation } from '@/lib/database/models/totaldonation.model';
import { checkoutTotalDonation } from '@/lib/actions/totaldonation.actions';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const DonationButton = ({donor, userId}: {donor: ITotaldonation, userId: string}) => {
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
        const totaldonation = {
            donorId: userId,
            }

        await checkoutTotalDonation(totaldonation);
     
    }

  return (
    <form action={onCheckout} method='post'>
        <Button type='submit' role='link' size="lg" className='button sm:w-fit'>
            Donate Now
        </Button>
    </form>
  )
}

export default DonationButton
