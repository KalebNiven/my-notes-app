# My Notes App

## Description

My Notes App is an intuitive web application designed for personal note management. It offers users the ability to capture their thoughts and ideas through notes, which they can create, view, update, and delete seamlessly. This app is particularly useful for organizing tasks, reminders, or any personal documentation, providing a user-friendly platform that integrates smoothly with daily routines.

## Features

- **Note Management:** Users can add new notes with text content, view them in a list format, edit their details, or delete them as needed.
- **Real-time Updates:** Changes made to notes are updated in real-time, and is very fast, ensuring that the information displayed is always current.
- **Responsive Design:** The application is fully responsive, providing an optimal viewing experience across various devices and screen sizes.
- **Search Functionality:** Quickly find specific notes using the search feature, which filters notes based on keywords within the title or text.

## User Authentication Flow

- **Sign Up Process:** Users can register for an account by providing a username, email, and password. The signup process includes validations to ensure data integrity, such as verifying that the email address is in a valid format and the password meets specified security criteria.
- **Sign In Process:** Returning users can log in using their registered email and password. Upon successful authentication, users are granted access to their notes. Incorrect login attempts will be notified with a specific error message regarding incorrect credentials to improve user experience.


## Technology Stack

- **Frontend:** React 
- **Backend:** Node.js with Express
- **Database:** PostgreSQL

## Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/my-notes-app.git
   cd my-notes-app
   ```

2. **Backend Setup:**
   - Navigate to the backend directory and install dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Configure the PostgreSQL database:
     ```bash
     psql -U postgres
     CREATE DATABASE mynotes;
     \q
     ```
   - Set up environment variables in `.env`:
     ```plaintext
     DB_USER=yourPostgresUsername
     DB_HOST=localhost
     DB_DATABASE=mynotes
     DB_PASSWORD=yourPostgresPassword
     DB_PORT=5432
     ```
   - Run the server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**
   - Move to the frontend directory and install required packages:
     ```bash
     cd ../frontend
     npm install
     ```
   - Start the React application:
     ```bash
     npm start
     ```
   - The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Testing

To test the API endpoints, use Postman or any other API testing tool to send requests to `http://localhost:3001/api/notes`.

## Deployment

Document the process you followed to deploy the application, including any platforms and tools used.

### Future Improvements
- **Collaboration Features:** Introduce the ability for users to share notes and collaborate in real-time.
- **Enhanced Security:** Implement more robust authentication and authorization to secure user data.
- **Rich Text Editing:** Add rich text capabilities to the note editor, allowing for more dynamic note content.

## Authors

- **Kaleb Niven**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

