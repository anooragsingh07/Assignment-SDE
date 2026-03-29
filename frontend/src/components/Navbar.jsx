import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { API_URL } from '../config'

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  // Fetch cart count on mount and when location changes
  useEffect(() => {
    fetchCartCount()
  }, [location])

  const fetchCartCount = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`)
      const data = await response.json()
      // Calculate total items in cart
      const totalItems = data.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalItems)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/?search=${searchTerm}`)
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          🛍️ ShopKart
        </Link>

        {/* Search Bar */}
        <form className="d-flex search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            🔍
          </button>
        </form>

        {/* Navigation Links */}
        <div className="d-flex align-items-center">
          <Link className="nav-link" to="/">
            🏠 Home
          </Link>
          <Link className="nav-link" to="/orders">
            📦 Orders
          </Link>
          <Link className="nav-link cart-link" to="/cart">
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
