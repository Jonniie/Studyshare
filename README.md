# StudyShare

A React TypeScript application for sharing and accessing past questions from universities.

## Features

- User authentication (login/signup)
- Browse past questions by university, faculty, department, and year
- Upload past questions
- User profiles with contribution tracking

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
VITE_BASE_URL=http://localhost:8000
```

3. Start the development server:

```bash
npm run dev
```

## API Integration

The application integrates with your backend API for authentication:

### Login

- **Endpoint**: `POST /auth/login`
- **Payload**:

```json
{
  "email": "string",
  "password": "string"
}
```

### Signup

- **Endpoint**: `POST /auth/signup`
- **Payload**:

```json
{
  "full_name": "string",
  "email": "string",
  "phone_number": "string",
  "university": "string",
  "password": "string"
}
```

## Environment Variables

- `VITE_BASE_URL`: Your backend API base URL (default: http://localhost:8000)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (AuthContext)
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (API client)
└── data/               # Mock data (for development)
```

## Authentication Flow

1. User fills out login/signup form
2. Form data is sent to your API endpoints
3. On successful authentication, user data and token are stored in localStorage
4. User is redirected to the explore page
5. Token is automatically included in subsequent API requests

## Error Handling

- Form validation for required fields
- Password confirmation matching
- API error messages displayed to users
- Loading states during API calls
