# BookHaven - A High-Performance Bookstore

A MERN stack web application for managing books.

## Project Structure

**Backend**: Node.js, Express.js, MongoDB, Faker,.js (for records) 

**Frontend**: React, Tailwind CSS, React Router DOM


## Getting Started

### Prerequisites

- Node.js

- MongoDB database (local or cloud)


### Backend Setup

Navigate to the backend directory:

```
cd backend
```

Install dependencies:

```
npm install
```

Create a `.env` file in the `backend` directory and add your MongoDB connection string. The application requires this variable to connect to the database:

```
MONGODB_URL=your_mongodb_connection_string
```

Start the server:

- For development (with nodemon):

```
npm run dev
```

- For production:

```
npm start
```

The backend server will start on port **5555** by default.

### Frontend Setup

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

The application will be available at the URL provided in the terminal (usually http://localhost:5173).

