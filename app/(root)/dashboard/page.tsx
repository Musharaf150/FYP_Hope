
import BarCharts from '@/components/shared/BarCharts'
import { CardContent } from '@/components/shared/CardContent'
import CurrentMonthDonation from '@/components/shared/CurrentMonthDonation'
import DashboardSummary from '@/components/shared/DashboardSummary'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='wrapper flex flex-col gap-5 w-full'>
        <h2 className='h2-bold'>Dashboard</h2>
       <DashboardSummary />
        
      <section className='grid grid-cols-1 gap-4 transition-all lg:grid-cols-2'>
        <CardContent>
            <p className='p-4 font-semibold'>Overview</p>
            <BarCharts/>
        </CardContent>
        <CardContent>
            <section className='rounded-lg'>
                <p className='font-semibold'>Recent Activities</p>
                <CurrentMonthDonation/>
            </section>
        </CardContent>
      </section>
    </div>
  )
}

export default Dashboard
