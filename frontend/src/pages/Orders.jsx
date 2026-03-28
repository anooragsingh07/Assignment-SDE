import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Fetch all orders on component mount
  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/order`)
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
    setLoading(false)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return <div className="text-center mt-5">Loading orders...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>No orders yet</h3>
        <p className="text-muted">You haven't placed any orders.</p>
        <button 
          className="btn btn-amazon mt-3"
          onClick={() => navigate('/')}
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4">Your Orders</h2>

      {orders.map(order => (
        <div key={order.id} className="order-summary mb-3">
          {/* Order Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="text-muted">ORDER PLACED</span>
              <p className="mb-0">{formatDate(order.created_at)}</p>
            </div>
            <div>
              <span className="text-muted">TOTAL</span>
              <p className="mb-0 h5">${Number(order.total_amount).toFixed(2)}</p>
            </div>
            <div>
              <span className="text-muted">ORDER #</span>
              <p className="mb-0"><strong>{order.id}</strong></p>
            </div>
          </div>

          <hr />

          {/* Order Details */}
          <div className="row">
            <div className="col-md-6">
              <p><strong>Customer Name:</strong> {order.customer_name}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Shipping Address:</strong> {order.customer_address}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-2">
            <span className="badge bg-success">Delivered</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
