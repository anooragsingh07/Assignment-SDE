import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const API_URL = 'http://localhost:5000'

function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

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

  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>
  }

  return (
    <div className="row">
      {/* Sidebar - Category Filter */}
      <div className="col-md-3">
        <div className="category-filter">
          <h5>Filter by Category</h5>
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
      </div>

      {/* Product Grid */}
      <div className="col-md-9">
        {searchTerm && (
          <h4 className="mb-3">Search results for: "{searchTerm}"</h4>
        )}

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
