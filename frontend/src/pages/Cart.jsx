import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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

  // Update item quantity
  const updateQuantity = async (id, newQuantity) => {
    try {
      await fetch(`${API_URL}/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      })
      fetchCart() // Refresh cart
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      await fetch(`${API_URL}/cart/${id}`, {
        method: 'DELETE'
      })
      fetchCart() // Refresh cart
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0).toFixed(2)
  }

  if (loading) {
    return <div className="text-center mt-5">Loading cart...</div>
  }

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
      {/* Cart Items */}
      <div className="col-md-8">
        <h2 className="mb-4">Shopping Cart</h2>

        {cartItems.map(item => (
          <div key={item.id} className="cart-item d-flex align-items-center">
            {/* Product Image */}
            <img src={item.image_url} alt={item.name} className="me-4" />

            {/* Product Details */}
            <div className="flex-grow-1">
              <h5>{item.name}</h5>
              <p className="text-success mb-2">In Stock</p>
              
              {/* Quantity Controls */}
              <div className="d-flex align-items-center gap-2">
                <label>Qty:</label>
                <select
                  className="form-select"
                  style={{ width: '80px' }}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                
                <span className="mx-2">|</span>
                
                <button 
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-end">
              <h5>${(item.price * item.quantity).toFixed(2)}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="col-md-4">
        <div className="order-summary">
          <h4>
            Subtotal ({cartItems.length} items): 
            <strong> ${calculateTotal()}</strong>
          </h4>
          <button 
            className="btn btn-amazon w-100 mt-3"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
