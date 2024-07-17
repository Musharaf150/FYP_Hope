"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IOrderItem } from '@/lib/database/models/order.model'

const Orders = () => {
  const [orders, setOrders] = useState<IOrderItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders')
        console.log('Response data:', response.data) // Log the response data
        if (Array.isArray(response.data)) {
          setOrders(response.data)
        } else {
          setError('Unexpected response format')
        }
      } catch (err) {
        console.error('Error fetching orders:', err) // Log the error
        setError('Error fetching orders')
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrders()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Stripe ID: {order.stripeId}</p>
            <p>Total Amount: {order.totalAmount}</p>
            <p>Event: {order.eventTitle}</p>
            <p>Buyer: {order.buyer.firstName} {order.buyer.lastName}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders
