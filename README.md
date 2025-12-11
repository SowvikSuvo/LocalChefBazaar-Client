# LocalChefBazaar – Marketplace for Local Home-Cooked Meals

## 📌 Project Purpose

LocalChefBazaar is a modern online platform connecting home cooks with customers seeking fresh, homemade meals. Customers can browse meals, place orders, leave reviews, and manage favorites, while chefs can upload menus and handle orders. Admins manage users, requests, and platform statistics.

**Tech Stack:** MERN (MongoDB, Express.js, React, Node.js)

---

## 🌐 Live Demo

- **Client URL:** [https://localchefbazaar.web.app/](https://localchefbazaar.web.app/)

---

## 🛠 Key Features

### User Roles

- **Admin:** Full access to manage users, orders, and platform settings.
- **Chef:** Upload meals, manage food items, handle customer orders.
- **Customer(User):** Browse meals, place orders, add reviews, favorites.

### 🔑 Authentication

- Email/password login and registration using Firebase Authentication
- Role-based access control
- JWT-based secure access for private routes

### 🍽 Meals Management

- Display daily meals with sorting and pagination
- Meal details page with full information (ingredients, chef info, reviews)
- Add meals to favorites
- Submit reviews with rating, comment, and timestamp

### 🛒 Ordering System

- Private order page with auto-filled meal info
- Confirm order with quantity and address
- Payment integration via Stripe
- Orders stored in MongoDB with live status updates

---

### Dashboards

**👨‍🍳Chef:**

- Create, update, delete meals
- View order requests from users
- Manage own meal collection

**📊Admin:**

- View/manage users
- Approve/reject chef/admin requests
- Mark users as fraud
- Platform statistics (orders, users, payments) with Recharts

**User:**

- View profile
- orders
- reviews
- favorites

---

### 📜 Extra Features

- Profile page with role upgrade requests
- Responsive design (TailwindCSS)
- Framer Motion animations
- Loading & error pages
- Dynamic page titles
- Optional: search functionality, Axios interceptors

---

## 📦 NPM Packages

### Client

- headlessui/react
- tailwindcss/vite
- tanstack/react-query
- axios
- firebase
- framer-motion
- lucide-react
- react
- react-dom
- react-hook-form
- react-hot-toast
- react-icons
- react-router
- react-simple-typewriter
- react-slick
- react-spinners
- react-toastify
- react-typed
- recharts
- slick-carousel
- sweetalert2
- tailwindcss

### Server

- cors
- dotenv
- express
- firebase-admin
- mongodb
- stripe
