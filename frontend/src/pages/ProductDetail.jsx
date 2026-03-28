import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch product details on component mount
  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    }
    setLoading(false)
  }

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

  // Buy now - add to cart and go to checkout
  const buyNow = async () => {
    await addToCart()
    navigate('/checkout')
  }

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>
  }

  if (!product) {
    return <div className="text-center mt-5">Product not found</div>
  }

  return (
    <div className="product-detail">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-5 text-center">
          <img src={product.image_url} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          <h2>{product.name}</h2>
          
          <hr />
          
          <p className="h3 text-danger mb-3">
            ${product.price}
          </p>

          <p className="mb-3">
            <strong>Category:</strong> {product.category}
          </p>

          <p className="mb-3">
            <strong>Stock:</strong>{' '}
            {product.stock > 0 ? (
              <span className="text-success">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </p>

          <p className="mb-4">
            <strong>Description:</strong><br />
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="d-flex gap-3">
            <button className="btn btn-amazon btn-lg" onClick={addToCart}>
              Add to Cart
            </button>
            <button className="btn btn-buy-now btn-lg" onClick={buyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
