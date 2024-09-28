<h1>Blog MERN Stack Application</h1>
<p>
    This project is a MERN stack application designed to serve as a blogging platform. It includes user authentication, post management, category management, and tag management.
</p>

<h3>Installation</h3>
<p>To install the dependencies for both the server and client, follow these steps:</p>
<ul>
    <li>On the root folder: <code>npm install</code></li>
    <li>On the client folder: <code>npm install</code></li>
</ul>

<h3>Environment Variables</h3>
<p>Create a <code>.env</code> file in the server directory with the following variables:</p>
<ul>
    <li><code>PORT = "4050"</code></li>
    <li><code>MONGO_URI = &lt;Your MongoDB Connection URI&gt;</code></li>
    <li><code>JWT_SECRET = &lt;Your JWT Secret&gt;</code></li>
</ul>

<h3>Running the Project</h3>
<ul>
    <li>Running only server: <code>npm run server</code></li>
    <li>Running only client: <code>npm run client</code></li>
    <li>Running both: <code>npm run dev</code></li>
</ul>
<p>
    This command will run both the server and the client simultaneously using concurrently. The server will be available at <a href="http://localhost:4050">http://localhost:4050</a>. The client will typically be available at <a href="http://localhost:3000">http://localhost:3000</a>.
</p>

<h3>API Routes</h3>
<p>The application exposes the following API routes:</p>

<h4>Users Routes (/api/users)</h4>
<ul>
    <li><code>POST http://localhost:4050/api/users/</code>: Register a new user.</li>
    <li><code>POST http://localhost:4050/api/users/login</code>: Authenticate a user and return a JWT token.</li>
    <li><code>GET http://localhost:4050/api/users/me</code>: Get information about the authenticated user (protected).</li>
    <li><code>POST http://localhost:4050/api/users/delete</code>: Delete the authenticated user (protected).</li>
</ul>

<h4>Categories Routes (/api/categories)</h4>
<ul>
    <li><code>GET http://localhost:4050/api/categories/</code>: Get all categories.</li>
    <li><code>GET http://localhost:4050/api/categories/categories</code>: Get categories created by the authenticated user (protected).</li>
    <li><code>GET http://localhost:4050/api/categories/category/:id</code>: Get a specific category by ID (protected).</li>
    <li><code>PUT http://localhost:4050/api/categories/:id</code>: Edit a specific category by ID (protected).</li>
    <li><code>POST http://localhost:4050/api/categories/</code>: Create a new category (protected).</li>
    <li><code>POST http://localhost:4050/api/categories/delete</code>: Delete a specific category (protected).</li>
</ul>

<h4>Posts Routes (/api/posts)</h4>
<ul>
    <li><code>GET http://localhost:4050/api/posts/</code>: Get all posts.</li>
    <li><code>GET http://localhost:4050/api/posts/user</code>: Get posts created by the authenticated user (protected).</li>
    <li><code>POST http://localhost:4050/api/posts/</code>: Create a new post (protected).</li>
    <li><code>GET http://localhost:4050/api/posts/:id</code>: Get a specific post by ID.</li>
    <li><code>PUT http://localhost:4050/api/posts/:id</code>: Update a specific post by ID (protected).</li>
    <li><code>DELETE http://localhost:4050/api/posts/:id</code>: Delete a specific post by ID (protected).</li>
</ul>

<h4>Tags Routes (/api/tags)</h4>
<ul>
    <li><code>GET http://localhost:4050/api/tags/</code>: Get all tags.</li>
    <li><code>GET http://localhost:4050/api/tags/tags</code>: Get tags created by the authenticated user (protected).</li>
    <li><code>GET http://localhost:4050/api/tags/tag/:id</code>: Get a specific tag by ID (protected).</li>
    <li><code>PUT http://localhost:4050/api/tags/:id</code>: Edit a specific tag by ID (protected).</li>
    <li><code>POST http://localhost:4050/api/tags/</code>: Create a new tag (protected).</li>
    <li><code>POST http://localhost:4050/api/tags/delete</code>: Delete a specific tag (protected).</li>
</ul>

<h3>License</h3>
<p>This project is licensed under the ISC License.</p>