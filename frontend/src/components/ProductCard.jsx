import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

function ProductCard({ product }) {
  const navigate = useNavigate()

  // Add product to cart
  const addToCart = async () => {
    try {
      await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      })
      alert('Added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  return (
    <div className="product-card">
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
        ${product.price}
      </p>

      {/* Add to Cart Button */}
      <button className="btn btn-amazon w-100" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
