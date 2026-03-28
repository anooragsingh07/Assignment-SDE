-- Seed data for products table
USE ecommerce_db;

INSERT INTO products (name, price, description, image_url, category, stock) VALUES
-- Electronics
('Wireless Bluetooth Headphones', 79.99, 'High-quality wireless headphones with noise cancellation and 30-hour battery life.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', 'Electronics', 50),

('Smartphone Stand', 24.99, 'Adjustable aluminum phone stand for desk. Compatible with all smartphones.', 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300', 'Electronics', 100),

('USB-C Hub', 49.99, '7-in-1 USB-C hub with HDMI, USB 3.0 ports, and SD card reader.', 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=300', 'Electronics', 75),

('Wireless Mouse', 29.99, 'Ergonomic wireless mouse with silent clicks and long battery life.', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300', 'Electronics', 120),

-- Clothing
('Cotton T-Shirt', 19.99, 'Comfortable 100% cotton t-shirt available in multiple colors.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', 'Clothing', 200),

('Denim Jeans', 59.99, 'Classic fit denim jeans with stretch comfort technology.', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300', 'Clothing', 80),

('Running Shoes', 89.99, 'Lightweight running shoes with cushioned sole for maximum comfort.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', 'Clothing', 60),

-- Home
('Coffee Mug', 14.99, 'Ceramic coffee mug with modern design. Dishwasher safe.', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300', 'Home', 150),

('Desk Lamp', 39.99, 'LED desk lamp with adjustable brightness and color temperature.', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300', 'Home', 45),

('Plant Pot', 12.99, 'Minimalist ceramic plant pot for indoor plants.', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300', 'Home', 90),

-- Books
('JavaScript Guide', 34.99, 'Complete guide to modern JavaScript programming.', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300', 'Books', 40),

('Design Patterns', 44.99, 'Essential design patterns for software developers.', 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300', 'Books', 35);
