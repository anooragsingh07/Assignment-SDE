import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../config'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

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

  const buyNow = async () => {
    try {
      await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      })
      navigate('/checkout')
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  if (loading) {
    return <div className="text-center mt-5 amazon-muted">Loading...</div>
  }

  if (!product) {
    return <div className="text-center mt-5">Product not found</div>
  }

  const price = Number(product.price)
  const dollars = Math.floor(price)
  const cents = Math.round((price - dollars) * 100).toString().padStart(2, '0')
  const demoRating = (4.1 + (product.id % 9) * 0.1).toFixed(1)

  return (
    <>
      <nav className="amazon-breadcrumb mb-3" aria-label="Breadcrumb">
        <Link to="/">ShopKart</Link>
        <span className="amazon-breadcrumb-sep">›</span>
        <Link to="/">{product.category}</Link>
        <span className="amazon-breadcrumb-sep">›</span>
        <span className="amazon-breadcrumb-current">{product.name}</span>
      </nav>

      <div className="product-detail amazon-pdp">
        <div className="row g-4">
          <div className="col-lg-5 text-center">
            <div className="product-detail-image-wrap">
              <img src={product.image_url} alt={product.name} />
            </div>
          </div>

          <div className="col-lg-4">
            <h1 className="amazon-pdp-title h4">{product.name}</h1>
            <div className="amazon-stars-row mb-2" id="reviews">
              <span className="amazon-stars">★★★★☆</span>
              <span className="amazon-rating-link">{demoRating} out of 5</span>
            </div>
            <hr className="amazon-divider" />
            <div className="amazon-price-block amazon-pdp-price mb-3">
              <span className="amazon-price-label">Price:</span>
              <span className="amazon-price-symbol">$</span>
              <span className="amazon-price-whole">{dollars}</span>
              <span className="amazon-price-fraction">{cents}</span>
            </div>
            <p className="amazon-delivery-line mb-2">
              <span className="amazon-delivery-green">FREE delivery</span>
              {' '}
              <span className="amazon-delivery-date">on orders over $25</span>
            </p>
            <p className="mb-2">
              <strong className="amazon-label">Category:</strong>{' '}
              <Link to="/" className="amazon-inline-link">{product.category}</Link>
            </p>
            <p className="mb-3">
              <strong className="amazon-label">Availability:</strong>{' '}
              {product.stock > 0 ? (
                <span className="text-success">In Stock ({product.stock} left)</span>
              ) : (
                <span className="text-danger">Out of Stock</span>
              )}
            </p>
            <div className="amazon-about-item">
              <h2 className="h6 amazon-about-heading">About this item</h2>
              <ul className="amazon-bullet-list">
                <li>{product.description}</li>
                <li>Sold and shipped by ShopKart (demo store).</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="amazon-buy-box">
              <div className="amazon-price-block mb-3">
                <span className="amazon-price-symbol">$</span>
                <span className="amazon-price-whole">{dollars}</span>
                <span className="amazon-price-fraction">{cents}</span>
              </div>
              <p className="amazon-delivery-line small mb-3">
                <span className="amazon-delivery-green">FREE delivery</span>
                {' '}
                <span className="amazon-delivery-date">on orders over $25</span>
              </p>
              <p className="amazon-stock-in mb-3">
                {product.stock > 0 ? (
                  <span className="text-success fw-semibold">In Stock.</span>
                ) : (
                  <span className="text-danger">Unavailable.</span>
                )}
              </p>
              <button
                type="button"
                className="btn btn-amazon w-100 mb-2 amazon-add-btn"
                onClick={addToCart}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="btn btn-buy-now w-100 mb-3"
                onClick={buyNow}
                disabled={product.stock <= 0}
              >
                Buy Now
              </button>
              <div className="amazon-seller-block">
                <p className="small mb-1">
                  <span className="amazon-muted">Ships from </span>
                  <strong>ShopKart</strong>
                </p>
                <p className="small mb-0">
                  <span className="amazon-muted">Sold by </span>
                  <strong>ShopKart</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
