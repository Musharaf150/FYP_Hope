export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Events',
      route: '/#events',
    },
    {
      label: 'Campaigns',
      route: '/#compaigns',
    },
    {
      label: 'About',
      route: '/aboutus',
    },
    {
      label: 'Contact Us',
      route: '/contactus',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }