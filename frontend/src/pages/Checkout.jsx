import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

function Checkout() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  })

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`)
      const data = await response.json()
      setCartItems(data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
    setLoading(false)
  }

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0).toFixed(2)
  }

  // Place order
  const placeOrder = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.address) {
      alert('Please fill in all fields')
      return
    }

    try {
      const response = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.orderId) {
        setOrderId(data.orderId)
        setOrderPlaced(true)
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Error placing order. Please try again.')
    }
  }

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>
  }

  // Show order confirmation
  if (orderPlaced) {
    return (
      <div className="text-center mt-5">
        <div className="order-summary mx-auto" style={{ maxWidth: '500px' }}>
          <h2 className="text-success mb-4">✓ Order Placed Successfully!</h2>
          <p className="h5">Your Order ID: <strong>#{orderId}</strong></p>
          <p className="mt-3">Thank you for shopping with us!</p>
          <button 
            className="btn btn-amazon mt-4"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  // Show empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Your cart is empty</h3>
        <button 
          className="btn btn-amazon mt-3"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="row">
      {/* Checkout Form */}
      <div className="col-md-7">
        <div className="order-summary">
          <h2 className="mb-4">Checkout</h2>

          <form onSubmit={placeOrder}>
            {/* Name Input */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Address Input */}
            <div className="mb-4">
              <label className="form-label">Delivery Address</label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your complete address"
                required
              />
            </div>

            <button type="submit" className="btn btn-buy-now btn-lg w-100">
              Place Order
            </button>
          </form>
        </div>
      </div>

      {/* Order Summary */}
      <div className="col-md-5">
        <div className="order-summary">
          <h4 className="mb-4">Order Summary</h4>

          {cartItems.map(item => (
            <div key={item.id} className="d-flex justify-content-between mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <div className="d-flex justify-content-between">
            <strong>Total:</strong>
            <strong className="h4">${calculateTotal()}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
