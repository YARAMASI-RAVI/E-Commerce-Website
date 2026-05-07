# 🛒 ShopPro — Full Stack E-Commerce Platform

## 🌟 Live Overview

A modern Vintage, full-stack e-commerce web application with authentication, admin dashboard, and order management.

Built using industry-relevant technologies and clean architecture.

---

## 🚀 Features 

### 👤 User Features

* 🔐 Secure Authentication (JWT)
* 🛍 Browse Products
* 🔍 Search & Filter Products
* 🛒 Add to Cart
* 📦 Place Orders
* 📜 View Order History

### 🛠 Admin Features

* ➕ Add Products
* 🗑 Delete Products
* 📊 View All Orders
* 👑 Admin-only access control

---

## 🧱 Tech Stack

### Frontend

* React.js
* React Router
* CSS (Custom Styling)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas (Cloud)

### Authentication

* JWT (JSON Web Token)
* bcrypt (Password Hashing)

---

## 📂 Project Structure

```
ecommerce-project/
│
├── client/          # React Frontend
│   ├── vite project/
│   └── src/
│
├── server/          # Backend API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-project.git
cd ecommerce-project
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_atlas_url
PORT=5000
```

Run backend:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

| Variable  | Description                 |
| --------- | --------------------------- |
| MONGO_URI | MongoDB Atlas connection    |
| PORT      | Backend port (default 5000) |

---

## 🔗 API Endpoints

### 🧑 Users

* `POST /api/users/register`
* `POST /api/users/login`

### 📦 Products

* `GET /api/products`
* `POST /api/products` (Admin)
* `DELETE /api/products/:id` (Admin)

### 🛒 Orders

* `POST /api/orders`
* `GET /api/orders/my`
* `GET /api/orders` (Admin)

---

## 🧪 Testing APIs

Use tools like Postman to test endpoints.

---

## 📸 Screenshots 

* [Home](screenshots/Home.png)
* [Login Page](screenshots/Login Page.png)
* [Cart](screenshots/Cart.png)
* [Products](screenshots/Products.png)

---

## 🚀 Future Improvements

* 📱 Responsive UI (Mobile-first)
* ⭐ Product Ratings & Reviews
* 🧾 Invoice Generation
* 🔔 Notifications

---

## 🧠 What I Learned

* Full-stack architecture (MVC pattern)
* Authentication & Authorization (JWT)
* REST API design
* MongoDB cloud integration
* State management in React

---

## 👨‍💻 Author

**Ravi**
Aspiring Full Stack & DevOps Engineer

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🧠 Use it to learn and build more

---

## 📜 License

This project is for learning and portfolio purposes.
