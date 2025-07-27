# Game Library API

This project is a RESTful API for a game library system, built with Node.js, Express.js, and MongoDB. It provides functionalities for user authentication and for performing CRUD operations on a collection of games.

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Third-Party Packages Used](#third-party-packages-used)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Games](#games)
- [Bonus Features](#bonus-features)

## Features

- Secure user registration and login with password hashing (bcrypt).
- Token-based authentication using JSON Web Tokens (JWT).
- Protected routes to ensure only authenticated users can manage games.
- Full CRUD functionality for games.
- Search and filter games by title, genre, or platform.
- Input validation, structured error handling, and rate limiting.

## Setup and Installation

Follow these steps to get the project running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    cd [your-project-directory]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary variables. See the [Environment Variables](#environment-variables) section for details.

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on the port defined in your `.env` file (e.g., `http://localhost:3000`).

## Third-Party Packages Used

- **express**: Web framework for Node.js.
- **mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **dotenv**: For loading environment variables from a `.env` file.
- **express-validator**: For input validation.
- **[Add any other packages you used, e.g., cors, morgan, jest, mocha]**

## Environment Variables

The `.env` file is used to store sensitive information and configuration settings. Create this file in the project root.

.envServer ConfigurationPORT=3000MongoDB ConnectionMONGO_URI=your_mongodb_connection_stringJWT ConfigurationJWT_SECRET=your_super_secret_and_long_jwt_secretJWT_EXPIRES_IN=1d
**Important**: The `JWT_SECRET` is a private key used to sign the tokens. It should be a long, complex, and random string to ensure security.

## API Endpoints

Here are the available endpoints. You can use a tool like Postman to test them.

---

### Authentication

#### 1. Register a New User

-   **Endpoint:** `POST /api/auth/register`
-   **Description:** Creates a new user account.
-   **Body (raw, JSON):**
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }
    ```
-   **Success Response (201):**
    ```json
    {
      "message": "User registered successfully!"
    }
    ```

#### 2. Login a User

-   **Endpoint:** `POST /api/auth/login`
-   **Description:** Authenticates a user and returns a JWT.
-   **Body (raw, JSON):**
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
-   **Success Response (200):**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

---

### Games

**Note:** All game routes (except for GET requests) are protected and require a valid JWT in the `Authorization` header.

**Header Format:** `Authorization: Bearer <your_jwt_token>`

#### 1. Get All Games (with filtering)

-   **Endpoint:** `GET /api/games`
-   **Description:** Retrieves a list of all games. Can be filtered by `title`, `genre`, or `platform`.
-   **Query Parameters (Optional):**
    -   `title`: e.g., `/api/games?title=Cyberpunk`
    -   `genre`: e.g., `/api/games?genre=RPG`
    -   `platform`: e.g., `/api/games?platform=PC`
-   **Success Response (200):**
    ```json
    [
      {
        "_id": "60d0fe4f5311236168a109ca",
        "title": "The Witcher 3: Wild Hunt",
        "genre": "RPG",
        "platform": "PC",
        "releaseYear": 2015,
        "description": "An open-world RPG..."
      }
    ]
    ```

#### 2. Add a New Game

-   **Endpoint:** `POST /api/games`
-   **Description:** Adds a new game to the library.
-   **Body (raw, JSON):**
    ```json
    {
      "title": "Cyberpunk 2077",
      "genre": "RPG",
      "platform": "PC",
      "releaseYear": 2020,
      "description": "A futuristic open-world game."
    }
    ```
-   **Success Response (201):**
    ```json
    {
      "_id": "60d0fe4f5311236168a109cb",
      "title": "Cyberpunk 2077",
      "genre": "RPG",
      "platform": "PC",
      "releaseYear": 2020,
      "description": "A futuristic open-world game."
    }
    ```

#### 3. Edit a Game

-   **Endpoint:** `PUT /api/games/:id`
-   **Description:** Updates the details of a specific game.
-   **Body (raw, JSON):**
    ```json
    {
      "releaseYear": 2021,
      "description": "An updated description for the futuristic open-world game."
    }
    ```
-   **Success Response (200):**
    ```json
    {
      "_id": "60d0fe4f5311236168a109cb",
      "title": "Cyberpunk 2077",
      "genre": "RPG",
      "platform": "PC",
      "releaseYear": 2021,
      "description": "An updated description for the futuristic open-world game."
    }
    ```

#### 4. Delete a Game

-   **Endpoint:** `DELETE /api/games/:id`
-   **Description:** Removes a game from the library.
-   **Success Response (200):**
    ```json
    {
      "message": "Game deleted successfully."
    }
    ```

## Bonus Features

- **[Describe any bonus features you implemented, e.g., Rate Limiting]**: Implemented rate limiting on the authentication endpoints to prevent brute-force attacks.
- **[Describe any bonus features you implemented, e.g., Unit Tests]**: Included basic unit tests for the user registration and login functionality using **[Jest/Mocha]**. You can run the tests with `npm test`.

