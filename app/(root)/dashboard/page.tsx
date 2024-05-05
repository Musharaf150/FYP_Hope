import { data } from '@/app/dummydata'
import BarCharts from '@/components/shared/BarCharts'
import Card from '@/components/shared/Card'
import { CardContent } from '@/components/shared/CardContent'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='wrapper flex flex-col gap-5 w-full'>
        <h2 className='h2-bold'>Dashboard</h2>
      <section className='grid w-full grid-cols-1 gap-4 gap-x-8 transition-all
      sm:grid-cols-2 xl:grid-cols-4'>
        {data.map((d, i)=>
        <Card 
        key={i}
        label={d.label}
        amount={d.amount}
        icon={d.icon}/>
        )}
      </section>
      <section className='grid grid-cols-1 gap-4 transition-all lg:grid-cols-2'>
        <CardContent>
            <p className='p-4 font-semibold'>Overview</p>
            <BarCharts/>
        </CardContent>
        <CardContent>
            <section>
                <p className='font-semibold'>Recent Activities</p>
                <p className='text-sm text-gray-400'>You Donated {data[0].amount} this month.</p>
            </section>
        </CardContent>
      </section>
    </div>
  )
}

export default Dashboard
