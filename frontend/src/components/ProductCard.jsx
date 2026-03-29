import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

// Demo star row (not real reviews — varies slightly per product id)
function ProductStars({ productId }) {
  const rating = (4.1 + (productId % 9) * 0.1).toFixed(1)
  return (
    <div className="amazon-stars-row" aria-label={`${rating} out of 5 stars`}>
      <span className="amazon-stars">★★★★☆</span>
      <span className="amazon-rating-count">{rating}</span>
    </div>
  )
}

function ProductCard({ product, onCartUpdate }) {
  const navigate = useNavigate()
  const [isAdding, setIsAdding] = useState(false)
  const [showAdded, setShowAdded] = useState(false)

  const price = Number(product.price)
  const dollars = Math.floor(price)
  const cents = Math.round((price - dollars) * 100).toString().padStart(2, '0')

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
      setShowAdded(true)
      setTimeout(() => setShowAdded(false), 2000)
      if (onCartUpdate) onCartUpdate()
    } catch (error) {
      console.error('Error adding to cart:', error)
    }

    setIsAdding(false)
  }

  return (
    <div className="product-card amazon-product-card">
      {showAdded && (
        <div className="text-center mb-2">
          <span className="badge amazon-badge-added">Added to cart</span>
        </div>
      )}

      <div
        className="product-card-image-wrap"
        onClick={() => navigate(`/product/${product.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}
      >
        <img src={product.image_url} alt={product.name} />
      </div>

      <h5
        className="product-name amazon-product-title"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {product.name}
      </h5>

      <ProductStars productId={product.id} />

      <div className="amazon-price-block">
        <span className="amazon-price-symbol">$</span>
        <span className="amazon-price-whole">{dollars}</span>
        <span className="amazon-price-fraction">{cents}</span>
      </div>

      <p className="amazon-delivery-line">
        <span className="amazon-delivery-green">FREE delivery</span>
        {' '}
        <span className="amazon-delivery-date">on orders over $25</span>
      </p>

      <p className="amazon-stock-line">
        {product.stock > 0 ? (
          <span className="text-success">In Stock</span>
        ) : (
          <span className="text-danger">Out of Stock</span>
        )}
      </p>

      <button
        className="btn btn-amazon w-100 amazon-add-btn"
        onClick={addToCart}
        disabled={isAdding || product.stock <= 0}
      >
        {isAdding ? 'Adding...' : 'Add to cart'}
      </button>
    </div>
  )
}

export default ProductCard
