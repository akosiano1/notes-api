# notes-api

A REST API for managing personal notes with user authentication. Built with Node.js, 
Express, and MongoDB — users can register, log in, and perform full CRUD operations 
on their own notes.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcryptjs

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB

### Installation

1. Clone the repo
   git clone https://github.com/akosiano1/notes-api.git
   cd notes-api

2. Install dependencies
   npm install

3. Create a .env file in the root
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

4. Run the development server
   npm run dev

## API Endpoints

### Auth
| Method | Endpoint             | Auth | Description        |
|--------|----------------------|------|--------------------|
| POST   | /api/auth/register   | ❌   | Register a user    |
| POST   | /api/auth/login      | ❌   | Login, get token   |

### Notes
| Method | Endpoint             | Auth | Description        |
|--------|----------------------|------|--------------------|
| GET    | /api/notes           | ✅   | Get all your notes |
| POST   | /api/notes           | ✅   | Create a note      |
| PUT    | /api/notes/:id       | ✅   | Update a note      |
| DELETE | /api/notes/:id       | ✅   | Delete a note      |

For protected routes, include the token in the request header:
   Authorization: Bearer <your_token>

## Request Examples

### Register
POST /api/auth/register
{
  "username": "john",
  "email": "john@email.com",
  "password": "yourpassword"
}

### Create Note
POST /api/notes
{
  "title": "My Note",
  "content": "Note content here"
}
