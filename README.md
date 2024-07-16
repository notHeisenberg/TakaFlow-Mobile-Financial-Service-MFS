# TakaFlow - Mobile Financial Service (MFS) Application

TakaFlow is a secure and user-friendly Mobile Financial Service (MFS) application developed using React.js for the frontend and Node.js, Express.js, and MongoDB for the backend. It facilitates easy and efficient financial transactions similar to services like bKash and Nagad.

## Features

### User
- **Registration:** Register with Name, 5-digit PIN, Mobile Number, and Email. Admin approval required.
- **Login:** Secure login using Mobile Number/Email and PIN.
- **Send Money:** Transfer funds to other users with PIN and JWT verification. Transactions over 100 Taka incur a 5 Taka fee. Minimum transaction amount is 50 Taka.
- **Cash-Out:** Withdraw funds through agents with a 1.5% fee.
- **Cash-In:** Add funds via agents without any fee.
- **Balance Inquiry:** Check account balance anytime.
- **Transaction History:** View last 10 transactions.

### Agent
- **Registration:** Register with Name, 5-digit PIN, Mobile Number, and Email. Admin approval required.
- **Login:** Secure login using Mobile Number/Email and PIN.
- **Manage Transactions:** Approve cash-in and cash-out requests.
- **Balance Inquiry:** Check account balance anytime.
- **Transaction History:** View last 20 transactions.

### Admin
- **Login:** Secure login using Mobile Number/Email and PIN.
- **User Management:** View, search, activate, and block user accounts.
- **System Monitoring:** View all system transactions.

## Technology Stack

### Frontend
- **React.js**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **Formik**
- **Yup**
- **JWT Decode**
- **React Icons**
- **Moment.js**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **bcrypt.js**
- **jsonwebtoken**
- **dotenv**
- **cors**
- **body-parser**
- **Nodemon (development)**
- **Eslint (development)**

## Installation and Setup

### Frontend

1. Create a React application:

    ```bash
    npx create-react-app mfs-frontend
    cd mfs-frontend
    ```

2. Install necessary packages:

    ```bash
    npm install react-router-dom axios jwt-decode formik yup react-icons moment tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3. Configure `tailwind.config.js`:

    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

4. Add Tailwind directives to `src/index.css`:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

### Backend

1. Initialize a Node.js application:

    ```bash
    mkdir mfs-backend
    cd mfs-backend
    npm init -y
    ```

2. Install necessary packages:

    ```bash
    npm install express mongoose bcryptjs jsonwebtoken dotenv cors body-parser
    npm install --save-dev nodemon eslint
    ```

3. Create a `.env` file:

    ```plaintext
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. Set up project structure:

    ```
    mfs-backend/
    │
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── utils/
    ├── .env
    ├── .eslintrc.js
    ├── package.json
    ├── package-lock.json
    └── server.js
    ```

5. Example `server.js`:

    ```javascript
    require('dotenv').config();
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const authRoutes = require('./routes/authRoutes');
    const userRoutes = require('./routes/userRoutes');
    const transactionRoutes = require('./routes/transactionRoutes');

    const app = express();

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/transactions', transactionRoutes);

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Failed to connect to MongoDB', err);
    });

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
