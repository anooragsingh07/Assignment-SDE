import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

function ProductCard({ product, onCartUpdate }) {
  const navigate = useNavigate()
  const [isAdding, setIsAdding] = useState(false)
  const [showAdded, setShowAdded] = useState(false)

  // Add product to cart
  const addToCart = async (e) => {
    e.stopPropagation()
    setIsAdding(true)
    
    try {
      await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      })
      
      // Show success feedback
      setShowAdded(true)
      setTimeout(() => setShowAdded(false), 2000)
      
      // Trigger navbar refresh
      if (onCartUpdate) onCartUpdate()
      
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
    
    setIsAdding(false)
  }

  return (
    <div className="product-card">
      {/* Success Badge */}
      {showAdded && (
        <div className="text-center mb-2">
          <span className="badge bg-success">✓ Added to Cart!</span>
        </div>
      )}
      
      {/* Product Image */}
      <img
        src={product.image_url}
        alt={product.name}
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer' }}
      />

      {/* Product Name */}
      <h5
        className="product-name"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {product.name}
      </h5>

      {/* Product Price */}
      <p className="product-price">
        ${Number(product.price).toFixed(2)}
      </p>

      {/* Stock Status */}
      <p className="mb-2">
        <small className="text-success">✓ In Stock</small>
      </p>

      {/* Add to Cart Button */}
      <button 
        className="btn btn-amazon w-100" 
        onClick={addToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : '🛒 Add to Cart'}
      </button>
    </div>
  )
}

export default ProductCard
