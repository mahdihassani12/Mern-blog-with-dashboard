<h1>Blog MERN Stack Application</h1>
<p>
This project is a MERN stack application designed to serve as a blogging platform. It includes user authentication, post management, category management, and tag management.
</p>

<h3>Installation</h3>
To install the dependencies for both the server and client, follow these steps:

--> On the root folder: npm install
--> On the client folder: npm install

<h3>Environment Variables</h3>
Create a .env file in the server directory with the following variables:

PORT = "4050"
MONGO_URI = <Your MongoDB Connection URI>
JWT_SECRET = <Your JWT Secret>

<h3>Running the Project</3>

--> Running only server: npm run server
--> Running only client: npm run client
--> Running both: npm run dev

This command will run both the server and the client simultaneously using concurrently.
The server will be available at http://localhost:4050.
The client will typically be available at http://localhost:3000.

<h3>API Routes</h3>
The application exposes the following API routes:

Users Routes (/api/users)
POST http://localhost:4050/api/users/: Register a new user.
POST http://localhost:4050/api/users/login: Authenticate a user and return a JWT token.
GET http://localhost:4050/api/users/me: Get information about the authenticated user (protected).
POST http://localhost:4050/api/users/delete: Delete the authenticated user (protected).

<br />

Categories Routes (/api/categories)
GET http://localhost:4050/api/categories/: Get all categories.
GET http://localhost:4050/api/categories/categories: Get categories created by the authenticated user (protected).
GET http://localhost:4050/api/categories/category/:id: Get a specific category by ID (protected).
PUT http://localhost:4050/api/categories/:id: Edit a specific category by ID (protected).
POST http://localhost:4050/api/categories/: Create a new category (protected).
POST http://localhost:4050/api/categories/delete: Delete a specific category (protected).

<br />

Posts Routes (/api/posts)
GET http://localhost:4050/api/posts/: Get all posts.
GET http://localhost:4050/api/posts/user: Get posts created by the authenticated user (protected).
POST http://localhost:4050/api/posts/: Create a new post (protected).
GET http://localhost:4050/api/posts/:id: Get a specific post by ID.
PUT http://localhost:4050/api/posts/:id: Update a specific post by ID (protected).
DELETE http://localhost:4050/api/posts/:id: Delete a specific post by ID (protected).

<br />

Tags Routes (/api/tags)
GET http://localhost:4050/api/tags/: Get all tags.
GET http://localhost:4050/api/tags/tags: Get tags created by the authenticated user (protected).
GET http://localhost:4050/api/tags/tag/:id: Get a specific tag by ID (protected).
PUT http://localhost:4050/api/tags/:id: Edit a specific tag by ID (protected).
POST http://localhost:4050/api/tags/: Create a new tag (protected).
POST http://localhost:4050/api/tags/delete: Delete a specific tag (protected).

<h3>License</h3>
This project is licensed under the ISC License.

