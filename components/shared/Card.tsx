import { LucideIcon } from 'lucide-react';
import { CardContent } from './CardContent';


export type CardProps = {
    label: string;
    icon: LucideIcon;
    amount: string;
}

export default function Card(props: CardProps){
  return (
    <CardContent>
        <section className='flex justify-between'>
            <p>{props.label}</p>
            <props.icon className='h-4 w-4 text-gray-400' />
        </section>
        <section className='flex flex-col gap-1'>
            <h2 className='text-2xl font-semibold'>{props.amount}</h2>
        </section>

    </CardContent>
  )
}

  

