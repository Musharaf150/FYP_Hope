"use client"

import { getAllUsers } from '@/lib/actions/user.actions';
import Image from 'next/image'
import { useEffect, useState } from 'react';

interface User {
  id?: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
}

const TotalUserBox = () => {
  const [users, setUsers] = useState<User[]>([]); // Explicitly define the type of users as User[]

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error in fetching users
      }
    }

    fetchUsers();
  }, []);

  return (
    <section className='total-balance'>
    <div className='flex items-center flex-col gap-2'>
        <Image src="/icons/group.png"
                alt='logo' width={75} height={85}
               />
            <p className='total-balance-amount flex-center gap-2'>
                {users.length}
            </p>
    </div>
</section> 
  )
}

export default TotalUserBox