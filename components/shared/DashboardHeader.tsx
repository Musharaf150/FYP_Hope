import React from 'react'

import TotalUserBox from './TotalUserBox'
import TotalBalanceBox from './TotalBalanceBox'

const DashboardHeader = () => {
  return (
   <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1  gap-4'>
     
        <TotalUserBox />
        <TotalBalanceBox/>
    
   </div>
  )
}

export default DashboardHeader