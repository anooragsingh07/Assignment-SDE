import { Link } from 'react-router-dom'

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="amazon-footer">
      <button type="button" className="amazon-back-top" onClick={scrollTop}>
        Back to top
      </button>
      <div className="amazon-footer-links">
        <div className="container">
          <div className="row py-4 text-center text-md-start">
            <div className="col-md-3 mb-3">
              <h6 className="amazon-footer-heading">Get to Know Us</h6>
              <ul className="amazon-footer-list">
                <li><Link to="/">About ShopKart</Link></li>
                <li><Link to="/">Careers</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h6 className="amazon-footer-heading">Shop with Us</h6>
              <ul className="amazon-footer-list">
                <li><Link to="/">Your Account</Link></li>
                <li><Link to="/orders">Your Orders</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h6 className="amazon-footer-heading">Help</h6>
              <ul className="amazon-footer-list">
                <li><Link to="/">Help Center</Link></li>
                <li><Link to="/">Returns</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h6 className="amazon-footer-heading">Connect</h6>
              <ul className="amazon-footer-list">
                <li><a href="https://github.com/anooragsingh07/Assignment-SDE">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="amazon-footer-bottom">
        <div className="amazon-footer-logo">ShopKart</div>
        <p className="amazon-footer-copy">
          © {new Date().getFullYear()} ShopKart — learning / demo store (not affiliated with Amazon)
        </p>
      </div>
    </footer>
  )
}

export default Footer
