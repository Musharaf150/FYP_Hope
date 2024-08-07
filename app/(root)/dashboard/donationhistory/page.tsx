import { getAllDonationByUser } from "@/lib/actions/totaldonation.actions"
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";


const DonationHistory =  async () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const getHistory = await getAllDonationByUser(userId)

    if(!getHistory){
        throw new Error('Failed to Fetch Data')
    }

    const {totalAmount, donations } = getHistory

  return (
    <div className="wrapper container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Donation History</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Total Donations</h2>
        <p className="text-3xl text-green-500 font-bold">PKR {totalAmount.toLocaleString()}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Donations</h2>
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr><th className="py-2 px-4 border-b text-left">Donor</th>
            <th className="py-2 px-4 border-b text-left ">Amount</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
            
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{donation.donor.name}</td>
                <td className="py-2 px-4 border-b">PKR {parseFloat(donation.amount).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{formatDateTime(donation.createdAt).dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DonationHistory
