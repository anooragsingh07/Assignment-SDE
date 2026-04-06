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
<img width="1919" height="809" alt="image" src="https://github.com/user-attachments/assets/b453b8e3-aeff-444c-996d-7ceba6a36549" />
<img width="1919" height="636" alt="image" src="https://github.com/user-attachments/assets/256a74bb-4dc6-4276-91a9-7e753a5dc3c1" />
<img width="1903" height="854" alt="image" src="https://github.com/user-attachments/assets/9682ff9a-445b-4275-9d6e-a605b08121d3" />
<img width="1919" height="637" alt="image" src="https://github.com/user-attachments/assets/29bba10a-8318-4f3c-bbc6-099413065d1a" />
<img width="1919" height="700" alt="image" src="https://github.com/user-attachments/assets/6b6c173f-0e94-407c-8e87-d1947f736f65" />
<img width="1919" height="574" alt="image" src="https://github.com/user-attachments/assets/8550b8a3-0685-4e0d-8237-80739e3732da" />


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
https://www.linkedin.com/in/anooragsingh/
