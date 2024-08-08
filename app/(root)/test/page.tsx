"use client"
import { checkoutComRaised } from '@/lib/actions/comraised.actions';
import { ICompaign } from '@/lib/database/models/compaign.model';
import { auth } from '@clerk/nextjs/server';
import { useState } from 'react';

function Donate({compaign, userId}: {compaign: ICompaign, userId: string}) {
  
  const [amount, setAmount] = useState('');

  const handleDonate = async () => {
    const amountNumber = Number(amount);
    const comraised = {
        compaignTitle: compaign.title,
        compaignId: compaign._id,
        goal: compaign.goal,
        donorId: userId
    }

    if (amountNumber < 0.50) { // Adjust as needed for your minimum amount
      alert('The minimum donation amount is $0.50.');
      return;
    }

    try {
        const res = await checkoutComRaised(comraised)
      const response = await fetch(res, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amountNumber, compaignId: 'your-campaign-id', donorId: 'your-donor-id' }),
      });

      const result = await response.json();
      if (response.ok) {
        window.location.href = result.url;
      } else {
        console.error('Error:', result.error);
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error during donation:', error);
      alert('There was an error processing your donation. Please try again.');
    }
  };

  return (
    <div>
      <h1>Donate to Campaign</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        min="0.50"
        step="0.01"
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
}

export default Donate;
