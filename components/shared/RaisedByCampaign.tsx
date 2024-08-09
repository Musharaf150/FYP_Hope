"use client"

import { useEffect, useState } from 'react';
import { ICompaign } from '@/lib/database/models/compaign.model';
import { IComRaisedItem } from '@/lib/database/models/comraised.model';
import { getDonationByCampaign } from '@/lib/actions/comraised.actions';
type CardProps = {
    compaignId: string
  }
  
const TotalRaisedCard = ({ compaignId}: CardProps) => {
    const [donors, setDonors] = useState<IComRaisedItem[]>([])
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        const fetchDonors = async () => {
          try {
            const fetchedComRaised = await getDonationByCampaign(compaignId)
            setDonors(fetchedComRaised)
          } catch (err) {
            console.error('Failed to fetch orders', err)
            setError('Failed to fetch orders')
          }
        }
    
        fetchDonors()
      }, [compaignId])

       // Calculate the total amount
    const raisedAmount = donors.reduce((acc, donors) => acc + parseFloat(donors.raisedAmount), 0);

  return (
    <div className="total-raised-card">
      <p>Rs. {raisedAmount.toLocaleString()}</p>
    </div>
  );
};

export default TotalRaisedCard;
