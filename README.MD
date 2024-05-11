# My Notes App

## Description

My Notes App is a simple web application that allows users to create, view, update, and delete notes. It is designed to provide a straightforward interface for managing personal notes or reminders.

## Technology Stack

- **Frontend:** React 
- **Backend:** Node.js with Express
- **Database:** PostgreSQL

## Local Development Setup

Follow these steps to get your development environment set up:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/my-notes-app.git
cd my-notes-app
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the required packages:

```bash
npm install
```

#### Set up the PostgreSQL Database

Ensure that PostgreSQL is installed and running on your system. Create a new database:

```bash
psql -U postgres
CREATE DATABASE mynotes;
\q
```

#### Environment Variables

Create a `.env` file in the backend directory and add the following environment variables:

```plaintext
DB_USER=yourPostgresUsername
DB_HOST=localhost
DB_DATABASE=mynotes
DB_PASSWORD=yourPostgresPassword
DB_PORT=5432
```

#### Running the Server

Start the server with:

```bash
npm start
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install the necessary packages:

```bash
npm install
```

Start the frontend application:

```bash
npm start
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Testing

To test the API endpoints, use Postman or any other API testing tool to send requests to `http://localhost:3000/api/notes`.

## Deployment

Document the process you followed to deploy the application, including any platforms and tools used.

## Challenges and Improvements

- Describe any challenges you encountered during development.
- Outline potential improvements for future iterations of the application.

## Authors

- **Kaleb Niven**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

