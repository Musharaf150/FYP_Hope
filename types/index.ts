// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string 
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    photo: string
  }
  
  // ====== EVENT PARAMS
  export type CreateEventParams = {
    userId: string
    event: {
      title: string
      description: string
      location: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type UpdateEventParams = {
    userId: string
    event: {
      _id: string
      title: string
      imageUrl: string
      description: string
      location: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type DeleteEventParams = {
    eventId: string
    path: string
  }
  
  export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetEventsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
  }
  
  export type Event = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    imageUrl: string
    location: string
    startDateTime: Date
    endDateTime: Date
    url: string
    organizer: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }

  // ====== COMPAIGN PARAMS
export type CreateCompaignParams = {
  userId: string
  compaign: {
    title: string
    description: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    comCategoryId?: string
   goal: string
   isZakatEligible: boolean
  }
  path: string
}

export type UpdateCompaignParams = {
  userId: string
  compaign: {
    _id: string | undefined
    title: string
    description: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    comCategoryId: string
   goal: string
   isZakatEligible: boolean
  }
  path: string
}

export type DeleteCompaignParams = {
  compaignId: string
  path: string
}

export type GetAllCompaignsParams = {
  query: string
  comCategory: string
  limit: number
  page: number
}

export type GetCompaignsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedCompaignsByComCategoryParams = {
  comCategoryId: string
  compaignId: string
  limit?: number
  page: number | string
}

export type Compaign = {
  _id: string
  title: string
  description: string
  goal: string
  isZakatEligible:boolean
  imageUrl: string
  startDateTime: Date
  endDateTime: Date
  organizer: {
    _id: string
    firstName: string
    lastName: string
  }
  comCategory: {
    _id: string
    name: string
  }
}

// ====== COMCATEGORY PARAMS
export type CreateComCategoryParams = {
  comCategoryName: string
}
export type GetByCompaignParams = {
  compaignId: string
  searchString: string
}

// ====== COMRAISED PARAMS
export type CheckoutComRaisedParams = {
  compaignTitle: string
  compaignId: string
  goal: string
  donorId: string
}

export type CreateComRaisedParams = {
  stripeId: string
  compaignId: string
  donorId: string
  raisedAmount: string
  createdAt: Date
}

export type ComRaisedProps ={
  createdAt: Date,
  stripeId: String,
  raisedAmount: String,
  compaign: {
    compaignTitle: '$compaign.title',
    compaignId: '$compaign._id',
  },
  donorId: string,
}

export type GetComRaisedByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}


// ====== TOTALDONATION PARAMS
export type CheckoutTotalDonationParams = {
  donorId: string
}

export type CreateTotalDonationParams = {
  stripeId: string
  donorId: string
  amount: number
  createdAt: Date
}

export type TotalDonationProps ={
  createdAt: Date,
  stripeId: String,
  amount: number,
  donor: {
    donorEmail: '$donor.email',
    donorFirstname: '$donor.firstName',
    donorId: '$donor.lastName',
  },
  donorId: string,
}

export type GetTotalDonationByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

  export type serviceCardProps = {
    title: string
    icon: string
    bgColor: string
  }
  export type SearchParamsProps = {
    category: string
    query: string
    page: any
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }