# Game Library API
![Node](https://img.shields.io/badge/node-18.x-brightgreen)
![Express](https://img.shields.io/badge/express.js-^4.18.2-lightgrey)
![MongoDB](https://img.shields.io/badge/mongodb-%5E6.0-green)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

This project is a RESTful API for a game library system, built with Node.js, Express.js, and MongoDB. It provides functionalities for user authentication and for performing CRUD operations on a collection of games.

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Games](#games)
- [Third-Party Packages Used](#third-party-packages-used)

## Features

- 👤 Secure user registration and login with password hashing (bcrypt).
- 🔐 Token-based authentication using JSON Web Tokens (JWT).
- 🛡️ Protected routes to ensure only authenticated users can manage games.
- ✍🏽 Full CRUD functionality for games.
- 🔍 Search and filter games by title, genre, or platform.
- ✅ Input validation, logging, structured error handling, and rate limiting.

## Setup and Installation

Follow these steps to get the project running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/HolyShaq/game-library-api.git
    cd game-library-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a copy of the `.env.example` file in the root of the project, name it `.env` and add the necessary variables. See the [Environment Variables](#environment-variables) section for details.
    ```bash
    cp .env.example .env
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on the port defined in your `.env` file (e.g., `http://localhost:3000`).

## Environment Variables

The `.env` file is used to store sensitive information and configuration settings. Create this file in the project root or duplicate the `.env.example` file to use it as a template.

```env
PORT=3000

MONGODB_URI=<put-db-connection-url-here>

# JWT Secrets
ACCESS_TOKEN_SECRET=<put-secret-key-here>
REFRESH_TOKEN_SECRET=<put-secret-key-here>
```
**Important**: Both JWT secrets are private keys used to sign the tokens. They should be long, complex, and random to ensure security. To facilitate this, you can use the following command:
```bash
openssl rand -base64 32 | clip
```
This will copy a secure secret string into your clipboard. Run this twice and use output for both tokens.

## API Endpoints

Here are the available endpoints. I used Bruno in development but you can use a tool like Postman to test them.

If you do have bruno, you can open the collection from the folder `/bruno` in the root directory to test the endpoints.

---

### Authentication

#### 1. Register a New User

-   **Endpoint:** `POST /api/v1/auth/register`
-   **Description:** Creates a new user account, returns an access token in the response, and sets a refresh token in cookies.
-   **Body (raw, JSON):**
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123" // Min 9 chars long with 1 number
    }
    ```
-   **Success Response (201):**
    ```json
    {
      "message": "User registered successfully",
      "payload": {
        "id": "68865dcaf26af9e1fd8e8437",
        "username": "testuser",
        "email": "test@example.com"
      },
      "accessToken": "eyJhbGciOiJIUzI1..."
    }
    ```

#### 2. Login a User

-   **Endpoint:** `POST /api/v1/auth/login`
-   **Description:** Authenticates a user, returns an access token in the response, and sets a new refresh token in cookies.
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
      "message": "testuser logged in successfully",
      "accessToken": "eyJhbGciOiJIUzI..."
    }
    ```

#### 3. Refresh Access Token

-   **Endpoint:** `POST /api/v1/auth/refresh`
-   **Description:** Refreshes access token. Requires a refresh token to be set in the cookies to be used.
-   **Success Response (200):**
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI..."
    }
    ```

---

### Games

**Note:** All game routes (except for GET requests) are protected and require a valid JWT in the `Authorization` header.

**Header Format:** `Authorization: Bearer <your_jwt_token>`

#### 1. Get Specific Game

-   **Endpoint:** `GET /api/v1/games/:id`
-   **Description:** Retrieves a game's details by its id
-   **Success Response (200):**
    ```json
    {
      "_id": "68848ac9f0676459b9fb82fe",
      "title": "Outer Wilds",
      "genre": "puzzle",
      "platform": "pc",
      "releaseYear": 2019,
      "description": ""
    }
    ```

#### 2. Get All Games (with filtering)

-   **Endpoint:** `GET /api/v1/games`
-   **Description:** Retrieves a list of all games. Can be filtered by `title`, `genre`, or `platform`. Includes search score if fliters are included.
-   **Query Parameters (Optional):**
    -   `title`: e.g., `/api/games?title=Cyberpunk`
    -   `genre`: e.g., `/api/games?genre=RPG`
    -   `platform`: e.g., `/api/games?platform=PC`
    -   `releaseYear`: e.g., `/api/games?releaseYear=2007`
-   **Example Query**:
    - `/api/games?title=outer`
-   **Success Response (200):**
    ```json
    [
      {
        "_id": "6884b675891956209e1857b1",
        "title": "Outer Worlds",
        "genre": "action",
        "platform": "pc",
        "releaseYear": 2019,
        "description": "",
        "score": 0.75
      },
      {
        "_id": "68848ac9f0676459b9fb82fe",
        "title": "Outer Wilds",
        "genre": "puzzle",
        "platform": "pc",
        "releaseYear": 2019,
        "description": "",
        "score": 0.75
      }
    ]
    ```

#### 3. Add a New Game

-   **Endpoint:** `POST /api/v1/games`
-   **Description:** Adds a new game to the library.
-   **Body (raw, JSON):**
    ```json
    {
      "title": "Nine Sols",
      "genre": "action",
      "platform": "pc",
      "releaseYear": "2024"
    }
    ```
-   **Success Response (201):**
    ```json
    {
      "message": "Game added successfully",
      "game": {
        "title": "Nine Sols",
        "genre": "action",
        "platform": "pc",
        "releaseYear": 2024,
        "description": "",
        "_id": "6886667cf73d305b3ab76731"
      }
    }
    ```

#### 4. Update a Game

-   **Endpoint:** `PATCH /api/v1/games/:id`
-   **Description:** Replaces the game with a new game.
-   **Body (raw, JSON):**
    ```json
    {
      "title": "Nine Sols",
      "genre": "action",
      "platform": "pc",
      "releaseYear": "2024"
    }
    ```
-   **Success Response (200):**
    ```json
    { 
      "message": "Updated game successfully",
      "game": {
        "title": "Nine Sols",
        "genre": "action",
        "platform": "pc",
        "releaseYear": 2024,
        "description": "",
        "_id": "6886667cf73d305b3ab76731"
      }
    }
    ```

#### 5. Patch a Game

-   **Endpoint:** `PATCH /api/v1/games/:id`
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
      "message": "Updated game successfully",
      "game": {
        "_id": "60d0fe4f5311236168a109cb",
        "title": "Cyberpunk 2077",
        "genre": "RPG",
        "platform": "PC",
        "releaseYear": 2021,
        "description": "An updated description for the futuristic open-world game."
      } 
    }
    ```

#### 6. Delete a Game

-   **Endpoint:** `DELETE /api/games/:id`
-   **Description:** Removes a game from the library.
-   **Success Response (200):**
    ```json
    {
      "message": "Game deleted successfully."
    }
    ```

## Third-Party Packages Used

- **express**: Web framework for Node.js.
- **mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **express-rate-limit**: For basic rate limiting.
- **jest**: For testing.
- **validator**: For input validation.
- **dotenv**: For loading environment variables from a `.env` file.
- **cookie-parser**: For parsing refresh token cookies.
- **chalk**: For pretty logs.
