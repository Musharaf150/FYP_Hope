export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Events',
      route: '/events',
    },
    {
      label: 'Campaigns',
      route: '/campaigns',
    },
    {
      label: 'About',
      route: '/about',
    },
    {
      label: 'Contact Us',
      route: '/contact',
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