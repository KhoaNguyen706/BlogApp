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