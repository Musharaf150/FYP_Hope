"use client"
import { useState, useEffect } from 'react';
import { formatDateTime, formatPrice } from '@/lib/utils';
import { IComRaisedItem } from '@/lib/database/models/comraised.model';
import { getDonorsByUser } from '@/lib/actions/comraised.actions';
import Search from './Search';

interface SearchParamProps {
  searchParams: {
    donorId: string;
    query: string;
  };
}

const RaisedDonation = ({ searchParams }: SearchParamProps) => {
  const [donors, setDonors] = useState<IComRaisedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const donorId = searchParams?.donorId || '';
  const searchText = searchParams?.query || '';

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const fetchedComRaised = await getDonorsByUser({ donorId, searchString: searchText });
        setDonors(fetchedComRaised);
      } catch (err) {
        console.error('Failed to fetch donors', err);
        setError('Failed to fetch donors');
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [donorId, searchText]);
  const raisedAmount = donors.reduce((acc, donors) => acc + parseFloat(donors.raisedAmount), 0);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Campaign Title</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {donors.length === 0 ? (
              <tr className="border-b">
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No Donors found.
                </td>
              </tr>
            ) : (
              donors.map((row: IComRaisedItem) => (
                <tr
                  key={row._id}
                  className="p-regular-14 lg:p-regular-16 border-b"
                  style={{ boxSizing: 'border-box' }}
                >
                  <td className="min-w-[200px] flex-1 py-4 pr-4">{row.compaignTitle}</td>
                  <td className="min-w-[100px] py-4">{formatDateTime(row.createdAt).dateTime}</td>
                  <td className="min-w-[100px] py-4 text-left">{formatPrice(row.raisedAmount)}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="min-w-[100px] py-3 text-right px-3">Total Amount:</td>
              <td className="min-w-[100px] py-4 text-left font-semibold">{formatPrice(raisedAmount.toString())}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    </>
  );
};

export default RaisedDonation;
