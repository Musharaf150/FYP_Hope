import { CalendarDays, Caravan, DollarSign} from "lucide-react";

export const data = [
    {
      label: "Total Donations",
      amount: "$45,231",
      icon: DollarSign,
      
    },
    {
        label: "Participated Events",
        amount: "3",
        icon: CalendarDays,
        route: '/dashboard/mytickets'
    },
    {
        label: "Donated Campaigns",
        amount: "5",
        icon: Caravan,
        route: '/dashboard/mytickets'
    },
];
export const brdata= [
    {   month: "Jan",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Feb",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Mar",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Apr",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "May",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Jun",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Jul",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Aug",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Sep",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Oct",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Nov",
        donation: Math.floor(Math.random() * 5000) +1000
    },
    {   month: "Dec",
        donation: Math.floor(Math.random() * 5000) +1000
    },
]