import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()
    // Navigate to home with search query
    navigate(`/?search=${searchTerm}`)
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          ShopKart
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
        <div className="d-flex">
          <Link className="nav-link" to="/">
            Products
          </Link>
          <Link className="nav-link" to="/orders">
            📦 Orders
          </Link>
          <Link className="nav-link" to="/cart">
            🛒 Cart
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
