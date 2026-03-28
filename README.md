# ShopKart - E-Commerce Web Application

A minimal full-stack e-commerce application built with React, Node.js, Express, and MySQL.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), Bootstrap |
| Backend | Node.js, Express |
| Database | MySQL |

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js              # MySQL connection
│   ├── routes/
│   │   ├── productRoutes.js   # Product APIs
│   │   ├── cartRoutes.js      # Cart APIs
│   │   └── orderRoutes.js     # Order APIs
│   ├── database/
│   │   ├── schema.sql         # Database tables
│   │   └── seed.sql           # Sample data
│   ├── server.js              # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Header with search
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── ProductList.jsx   # Home page
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   │   ├── App.jsx            # Routes
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Styles
│   └── package.json
│
└── README.md
```

## Features

- **Product Listing**: Grid layout with search and category filter
- **Product Detail**: View product info, add to cart, buy now
- **Shopping Cart**: Update quantity, remove items, view total
- **Checkout**: Simple form with order confirmation

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get single product |
| GET | `/products/search/:name` | Search products |
| GET | `/products/category/:category` | Filter by category |
| POST | `/cart` | Add item to cart |
| GET | `/cart` | Get cart items |
| PUT | `/cart/:id` | Update quantity |
| DELETE | `/cart/:id` | Remove item |
| POST | `/order` | Place order |

## Database Schema

```sql
-- Products table
products(id, name, price, description, image_url, category, stock)

-- Cart table
cart(id, product_id, quantity)

-- Orders table
orders(id, total_amount, customer_name, customer_address, created_at)
```

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MySQL (v8+)

### Step 1: Clone the Repository

```bash
git clone https://github.com/anooragsingh07/Assignment-SDE.git
cd Assignment-SDE
```

### Step 2: Setup Database

1. Open MySQL and run:

```bash
mysql -u root -p
```

2. Execute the schema and seed files:

```sql
source backend/database/schema.sql;
source backend/database/seed.sql;
```

### Step 3: Configure Backend

1. Navigate to backend folder:

```bash
cd backend
```

2. Update `.env` file with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_db
PORT=5000
```

3. Install dependencies and start server:

```bash
npm install
npm start
```

Backend runs at: `http://localhost:5000`

### Step 4: Setup Frontend

1. Open a new terminal and navigate to frontend:

```bash
cd frontend
```

2. Install dependencies and start:

```bash
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Step 5: Open the App

Visit `http://localhost:5173` in your browser.

## Sample Data

The app comes with 12 sample products across 4 categories:
- Electronics (Headphones, USB Hub, Mouse, Phone Stand)
- Clothing (T-Shirt, Jeans, Running Shoes)
- Home (Coffee Mug, Desk Lamp, Plant Pot)
- Books (JavaScript Guide, Design Patterns)

## Screenshots
<img width="1894" height="871" alt="image" src="https://github.com/user-attachments/assets/c4234080-5309-44f0-adf4-bb64f6b69503" />
<img width="1917" height="650" alt="image" src="https://github.com/user-attachments/assets/19b17fc8-945a-4c08-a4a6-2f813130f351" />
<img width="1901" height="458" alt="image" src="https://github.com/user-attachments/assets/ab762ef5-548e-4f88-9e1a-66b0f7197afa" />
<img width="1909" height="728" alt="image" src="https://github.com/user-attachments/assets/f54df0fb-01d9-45b6-b0d6-a28a245b2faa" />

### Product Listing
- Grid layout of products
- Search bar in header
- Category filter dropdown

### Cart
- View all cart items
- Update quantity
- Remove items
- Total calculation

### Checkout
- Customer info form
- Order summary
- Order confirmation with ID

## Author

Anoorag Singh
