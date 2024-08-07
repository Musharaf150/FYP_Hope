import { getDonationsForCurrentMonth } from "@/lib/actions/totaldonation.actions";
import { auth } from "@clerk/nextjs/server";


const CurrentMonthDonation = async () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;



    const monthDonation = await getDonationsForCurrentMonth(userId)

    if(!monthDonation){
        throw new Error('Failed to Fetch Data')
    }

    const {totalAmount, donations } = monthDonation
  return (
    <>
    <div>
      <p className='text-sm text-gray-400'>You Donated {totalAmount.toLocaleString()} this month.</p>
    </div>
   <section className=" rounded-lg">
   <table className="min-w-full bg-white border border-gray-200">
              <thead className="rounded-t-lg">
                <tr>
                  <th className="px-4 py-2 border-b text-left rounded-t-lg">Date</th>
                  <th className="px-4 py-2 border-b text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="rounded-b-lg">
                {donations.slice(0, 10).map((donation, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border-b">PKR {parseFloat(donation.amount).toLocaleString()}</td>
                  </tr>
                ))}
                {donations.length === 0 && (
                  <tr>
                    <td className="px-4 py-2 border-b text-center" colSpan={3}>No donations found for this month.</td>
                  </tr>
                )}
              </tbody>
            </table>
   </section>
    </>
  )
}

export default CurrentMonthDonation
