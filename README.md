# BlogApp - Blogging Platform API

A RESTful API backend for a blogging platform built with Node.js, Express, and MongoDB.

## Table of Contents

- Features
- Technologies
- Installation
- API Documentation
- Testing with Postman

## Features

- Create, read, update, and delete blog posts
- Filter and search blog posts by term
- MongoDB database integration
- RESTful API architecture

## Technologies

- Node.js
- Express
- MongoDB & Mongoose
- TypeScript

## Installation

1. **Clone the repository**
	```bash
	git clone <repository-url>
	cd BloggingPlatform
	```

2. **Install dependencies**
	```bash
	cd be
	npm install
	```

3. **Configure environment variables**
	- Create a `.env` file in the `be` directory
	```
	PORT=5001
	MONGO_URI=your-mongodb-connection-string
	```

4. **Run the application**
	```bash
	npm start
	```

## API Documentation

### Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | /api/v1/posts     | Get all blog posts                   |
| POST   | /api/v1/posts     | Create a new blog post               |
| GET    | /api/v1/posts/:id | Get a specific blog post by ID       |
| PUT    | /api/v1/posts/:id | Update a blog post                   |
| DELETE | /api/v1/posts/:id | Delete a blog post                   |
| GET    | /api/v1/posts/search?term=keyword | Search posts by term |

### Request & Response Examples

#### Create a blog post
```json
// POST /api/v1/posts
// Request body:
{
  "title": "Introduction to Express",
  "content": "Express is a minimal and flexible Node.js web application framework...",
  "category": "Technology",
  "tags": ["node.js", "express", "backend"]
}
```

## Testing with Postman

### Download and Install Postman

1. **Download Postman**:
	- Visit [Postman's official website](https://www.postman.com/downloads/)
	- Click the download button for your operating system (Windows, macOS, or Linux)

2. **Install Postman**:
	- Windows: Run the installer and follow the prompts
	- macOS: Drag the Postman app to your Applications folder
	- Linux: Extract the downloaded file and run the Postman executable

3. **Create an Account** (optional but recommended):
	- You can use Postman without an account, but creating one allows you to save collections and share them

### Testing BlogApp API with Postman

1. **Open Postman** and create a new collection:
	- Click "New" button
	- Select "Collection"
	- Name it "BlogApp API"

2. **Create requests for each endpoint**:

	#### Get All Posts
	- Method: GET
	- URL: `http://localhost:5001/api/v1/posts`

	#### Create New Post
	- Method: POST
	- URL: `http://localhost:5001/api/v1/posts`
	- Headers: `Content-Type: application/json`
	- Body (raw JSON):
	  ```json
	  {
		 "title": "My First Blog Post",
		 "content": "This is the content of my first blog post.",
		 "category": "General",
		 "tags": ["first", "blog", "test"]
	  }
	  ```

	#### Get Post by ID
	- Method: GET
	- URL: `http://localhost:5001/api/v1/posts/[post_id]`
	- Replace `[post_id]` with an actual post ID from your database

	#### Update Post
	- Method: PUT
	- URL: `http://localhost:5001/api/v1/posts/[post_id]`
	- Headers: `Content-Type: application/json`
	- Body (raw JSON):
	  ```json
	  {
		 "title": "Updated Blog Post Title",
		 "content": "This content has been updated."
	  }
	  ```

	#### Search Posts
	- Method: GET
	- URL: `http://localhost:5001/api/v1/posts/search?term=blog`

	#### Delete Post
	- Method: DELETE
	- URL: `http://localhost:5001/api/v1/posts/[post_id]`

3. **Save your requests** within the collection for easy access later

4. **Test the API**:
	- Make sure your API server is running
	- Execute the requests and verify the responses

### Tips for Using Postman

- Use the "Collections" feature to organize related requests
- Use "Environment Variables" to easily switch between development and production APIs
- Use the "Tests" tab to write automated tests for your API responses
- Use the "Pre-request Script" tab to set up dynamic variables or authentication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## What's next (planned features)

Below are features and improvements I will try to add next to make the project production-ready and more powerful. This is a roadmap I tent to follow or pick items from.

- AI features
	- Auto-generate post summaries using a text generation model (e.g., OpenAI / Azure OpenAI).
	- Tag suggestion: suggest tags based on post content using an embedding or classification model.
	- Content moderation: scan content for disallowed language or spam.
	- Implementation notes: call an AI service from a background worker or on-demand via an API route. Consider cost and rate limits.

- Forgot password / Email flows
	- Add endpoints: `POST /api/v1/auth/forgot-password` and `POST /api/v1/auth/reset-password`.
	- Use an SMTP provider (SendGrid, Mailgun) or Supabase Auth email flow.
	- Required env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FRONTEND_URL`.
	- Flow outline: user submits email -> send tokenized link -> user clicks link -> frontend POSTs token + new password to reset endpoint.

- Authentication improvements / migrate to Supabase (optional)
	- If you want a hosted auth solution, Supabase offers email/password, OAuth providers, and session management.
	- Migration notes: remove Prisma/Local user model or keep it for app-specific profile data. Update server code to verify Supabase JWT or use Supabase client SDK.

- Tests and quality
	- Add unit tests for controllers and services (Jest + Supertest for API endpoints).
	- Add linting (ESLint) and type checking (TypeScript strict mode).

- Postman collection & automated tests
	- Export your Postman collection (File → Export) and include it in the repo for easy testing.
	- Add environment variables for Postman (base URL, auth token).


- Database migration & seed
	- Keep Prisma migrations in sync: `npx prisma migrate dev` for local migrations and `prisma migrate deploy` for production.
	- Add a `/prisma/seed.ts` script to bootstrap sample data (users, posts) for development.

