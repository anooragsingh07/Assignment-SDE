import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { API_URL } from '../config'

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetchCartCount()
  }, [location])

  const fetchCartCount = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`)
      const data = await response.json()
      const totalItems = data.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalItems)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchTerm.trim()
    if (q) navigate(`/?search=${encodeURIComponent(q)}`)
    else navigate('/')
  }

  return (
    <header className="amazon-header">
      {/* Row 1 — logo, deliver, search, account, cart */}
      <div className="amazon-nav-main">
        <Link className="amazon-logo" to="/" title="ShopKart Home">
          <span className="amazon-logo-text">Shop</span>
          <span className="amazon-logo-accent">Kart</span>
          <span className="amazon-logo-smile" aria-hidden />
        </Link>

        <button
          type="button"
          className="amazon-deliver"
          onClick={() => navigate('/')}
          aria-label="Choose delivery location"
        >
          <span className="amazon-deliver-icon" aria-hidden>📍</span>
          <span className="amazon-deliver-text">
            <span className="amazon-deliver-line1">Deliver to</span>
            <span className="amazon-deliver-line2">India</span>
          </span>
        </button>

        <form className="amazon-search" onSubmit={handleSearch}>
          <div className="amazon-search-inner">
            <label htmlFor="nav-search" className="visually-hidden">
              Search ShopKart
            </label>
            <span className="amazon-search-all" aria-hidden>
              All
            </span>
            <input
              id="nav-search"
              type="search"
              className="amazon-search-input"
              placeholder="Search ShopKart"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="amazon-search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
                  fill="#333"
                />
                <path
                  d="m20 20-4.2-4.2"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </form>

        <div className="amazon-nav-tools">
          <Link className="amazon-nav-block" to="/">
            <span className="amazon-nav-line1">Hello, guest</span>
            <span className="amazon-nav-line2">Account &amp; Lists</span>
          </Link>
          <Link className="amazon-nav-block" to="/orders">
            <span className="amazon-nav-line1">Returns</span>
            <span className="amazon-nav-line2">&amp; Orders</span>
          </Link>
          <Link className="amazon-cart-block" to="/cart">
            <div className="amazon-cart-inner">
              <span className="amazon-cart-count" aria-live="polite">
                {cartCount}
              </span>
              <span className="amazon-cart-icon" aria-hidden>
                🛒
              </span>
            </div>
            <span className="amazon-cart-label">Cart</span>
          </Link>
        </div>
      </div>

      {/* Row 2 — department strip */}
      <nav className="amazon-nav-sub" aria-label="Browse categories">
        <button type="button" className="amazon-all-btn" onClick={() => navigate('/')}>
          <span className="amazon-hamburger" aria-hidden>
            ☰
          </span>
          All
        </button>
        <button type="button" className="amazon-sub-link" onClick={() => navigate('/')}>
          Today&apos;s Deals
        </button>
        <Link to="/">Customer Service</Link>
        <Link to="/">Registry</Link>
        <Link to="/">Gift Cards</Link>
        <Link to="/">Sell</Link>
      </nav>
    </header>
  )
}

export default Navbar
