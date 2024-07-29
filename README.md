# API Documentation

## Overview
GlowSeoulNaija is an innovative eCommerce platform dedicated to bringing the best of Korean beauty products to Nigeria. My application seamlessly handles user registration, authentication, product management, and payments. Leveraging powerful technologies like MongoDB, Redis, JWT, and Stripe, GlowSeoulNaija ensures a secure, efficient, and delightful shopping experience.

Whether you're looking to enhance your skincare routine or explore exclusive Korean beauty trends, GlowSeoulNaija offers a user-friendly interface with robust backend services, making it a go-to destination for beauty enthusiasts in Nigeria.

#### Key Features
User Registration and Authentication: Securely register and authenticate users using token-based authentication (JWT).
Product Management: Users can browse, add, and manage products effortlessly.
Order Processing: Create and manage orders with real-time payment confirmation.
Secure Payments: Accept payments in NGN using Stripe integration.
Middlewares: Enhance security and functionality with custom middleware, including authentication and logging.
Real-time Notifications: Handle webhooks for payment notifications to keep users informed about their order status.
Caching: Improve performance with Redis caching for frequently accessed data.


# Features

- User registration and authentication
- Token-based authentication for secure access
- MongoDB as the backend database
- Real-time payment processing with Stripe
- Comprehensive logging and error handling
- Rate limiting to prevent abuse

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/LusterPearl/GlowSeoulNaija.git
   cd GlowSeoulNaija

### Install dependencies:
npm install
 
### Set up environment variables:
Create a .env file in the root directory and add your MongoDB connection string and Stripe keys:
MONGODB_URI=mongodb://localhost:27017/GlowSeoulNaija
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5001

### Start the server:
npm run start-server

## Base URL
http://localhost:5001

#####    Usage Examples

## Endpoints
1. User Registration
Endpoint: /register
Method: POST
Description: Creates a new user in the system.
{
    "email": "user@example.com",
    "password": "password123"
}
## Responses 
201 Created: User created successfully.
400 Bad Request: Invalid input (e.g., email format is incorrect).
409 Conflict: User already exists.
500 Internal Server Error: Something went wrong on the server.

###  User Registration
curl -X POST http://localhost:5001/api/register \
-H "Content-Type: application/json" \
-d '{
    "name": "username",
    "email": "user@example.com",
    "password": "password123"
}'
2. ### EndPoints
Endpoint: /login
Method: POST
Description: Authenticates a user and returns a JWT token.
##  User Login 
curl -X POST http://localhost:5001/api/login \
-H "Content-Type: application/json" \
-d '{
    "email": "user@example.com",
    "password": "password123"
}'

### Testing Product Search
To search for products:
curl -X GET http://localhost:5001/api/products?query=skincare

3. ### Product Management
Endpoint: /products
Method: GET
Description: Retrieves a list of all products.
Responses
200 OK: Returns an array of products.
500 Internal Server Error: Something went wrong on the server.

4. #### Order Management
Endpoint: /orders
Method: POST
Description: Creates a new order for the authenticated user.
Request Body:
{
    "productId": "123456",
    "quantity": 1
}
### Responses
201 Created: Order created successfully.
400 Bad Request: Invalid input.
401 Unauthorized: User not authenticated.
500 Internal Server Error: Something went wrong on the server.


#### Testing Payment
To simulate a payment:
curl -X POST http://localhost:5001/api/payment \
-H "Content-Type: application/json" \
-d '{
    "amount": 500000,
    "currency": "NGN",
    "token": "your-stripe-token"
}'

####  Middleware Overview
Authentication Middleware
Ensures that routes requiring authentication are protected. The authenticate middleware verifies JWT tokens and sets the user in the request object.

#### Logging Middleware
Logs HTTP requests and errors to help monitor application performance and detect issues. You can use libraries like Morgan or Winston for advanced logging features.

#### Rate Limiting Middleware
Prevents abuse by limiting the number of requests a user can make to certain endpoints. This is crucial for maintaining API stability and security.

 ### Dependencies
express: Fast, unopinionated, minimalist web framework for Node.js.
mongodb: MongoDB object modeling for Node.js.
bcrypt: Library to help hash passwords.
jsonwebtoken: Implementation of JSON Web Tokens for authentication.
dotenv: Module to load environment variables.
express-validator: Middleware for validating user input.
stripe: Library for integrating Stripe payment processing.

#### API Documentation
---
This documentation provides a clear and comprehensive overview of the **GlowSeoulNaija** application and its features, making it easier for developers and users to understand and interact with your API. For detailed API documentation, including all endpoints, request/response examples, and error codes, refer to the API Documentation section above. This provides comprehensive information to help you understand and utilize the API effectively.
