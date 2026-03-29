import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { API_URL } from '../config'

function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Get search term from URL
  const searchTerm = searchParams.get('search') || ''

  // Fetch products on component mount and when filters change
  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let url = `${API_URL}/products`

      // If searching, use search endpoint
      if (searchTerm) {
        url = `${API_URL}/products/search/${searchTerm}`
      }
      // If filtering by category, use category endpoint
      else if (selectedCategory) {
        url = `${API_URL}/products/category/${selectedCategory}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setProducts(data)

      // Extract unique categories from products (only on initial load)
      if (!searchTerm && !selectedCategory) {
        const uniqueCategories = [...new Set(data.map(p => p.category))]
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setLoading(false)
  }

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  // Force navbar to refresh cart count
  const handleCartUpdate = () => {
    // Navigate to same page to trigger useEffect in Navbar
    navigate(window.location.pathname + window.location.search)
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading products...</p>
      </div>
    )
  }

  return (
    <>
      <nav className="amazon-breadcrumb mb-3" aria-label="Breadcrumb">
        <Link to="/">ShopKart</Link>
        <span className="amazon-breadcrumb-sep">›</span>
        <span>
          {searchTerm ? `Results for "${searchTerm}"` : 'Home'}
        </span>
      </nav>

    <div className="row">
      {/* Sidebar - Category Filter */}
      <div className="col-md-3">
        <div className="category-filter amazon-sidebar-card">
          <h5 className="amazon-sidebar-title">Department</h5>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Stats */}
        <div className="category-filter amazon-sidebar-card">
          <h5 className="amazon-sidebar-title">Results</h5>
          <p className="mb-0 amazon-muted">{products.length} items</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="col-md-9">
        {searchTerm && (
          <div className="amazon-results-banner mb-3">
            <h1 className="amazon-results-title h5 mb-0">
              Results for <span className="amazon-highlight">&quot;{searchTerm}&quot;</span>
            </h1>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center mt-5 p-4 bg-white rounded-3">
            <h4>😕 No products found</h4>
            <p className="text-muted">Try a different search or category</p>
          </div>
        ) : (
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                <ProductCard 
                  product={product} 
                  onCartUpdate={handleCartUpdate}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default ProductList
