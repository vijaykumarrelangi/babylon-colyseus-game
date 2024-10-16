# Multiplayer Game with Babylon.js and Colyseus

This project is a real-time multiplayer 3D game that allows users to create and move shapes (like cubes and spheres) within a 3D scene. It is powered by **Babylon.js** for rendering 3D graphics and **Colyseus** for managing multiplayer game rooms and real-time interactions.

## **Features**
- Real-time shape creation and movement.
- Multiplayer support using WebSocket connections via Colyseus.
- 3D rendering with Babylon.js for an interactive environment.
- Backend state management to synchronize objects between clients.

---

## **Technologies Used**
- **Frontend:** React, Babylon.js
- **Backend:** Node.js, Colyseus
- **WebSocket Communication:** Colyseus.js
- **Development Tools:** Git, VSCode
- **Platform:** Local Server

---

## **Prerequisites**
Make sure the following tools are installed:
1. **Node.js**: [Download here](https://nodejs.org/)
2. **Git**: [Download here](https://git-scm.com/)
3. **Babylon.js Core Library**: Installed via NPM
4. **Colyseus.js Client Library**: Installed via NPM

---

## **Project Structure**

/client # React frontend /src App.js # Main React component with Babylon.js and Colyseus integration App.css # Styles for the application UI

/server # Backend server using Colyseus and Node.js index.js # Main backend server with game logic and WebSocket setup

/package.json # Dependencies for both client and server /README.md # Documentation file (this file)


---

## **Technologies Used**
- **Frontend:** React, Babylon.js  
- **Backend:** Node.js, Colyseus  
- **WebSocket Communication:** Colyseus.js  
- **Development Tools:** Git, VSCode  
- **Platform:** Local Server  

---

## **Prerequisites**
Make sure the following tools are installed:
1. **Node.js**: [Download here](https://nodejs.org/)  
2. **Git**: [Download here](https://git-scm.com/)  
3. **Babylon.js Core Library**: Installed via NPM  
4. **Colyseus.js Client Library**: Installed via NPM  

---

## **Installation Instructions**

### Step 1: Clone the Repository
Open a terminal and run:
```bash
git clone https://github.com/vijaykumarrelangi/babylon-colyseus-game.git
cd babylon-colyseus-game
```
### Step 2: Install Dependencies
Navigate to both the server and client directories and install their dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

```
 # How to Run the Application
### Step 1: Start the Backend Server
1.Navigate to the server folder
```bash
cd server

```

2.Start the server:
```bash
node index.js
```
3.The server will run on http://localhost:3004.

### Step 2: Run the React Frontend
1. Open a new terminal and navigate to the client folder:
```bash
cd client

```
2.Start the React development server:
```bash
npm start


```
3.The frontend will be available at http://localhost:3000.

 # Usage
 1.Create a Shape
  - Use the "Create Box" or "Create Sphere" buttons on the UI to generate a 3D shape.
2.Move a Shape
  - Shapes can be moved programmatically through WebSocket events.
3.Multiplayer Support
  - Actions taken by one user are reflected in real-time across all connected users.

---
# API Endpoints via WebSocket Messages
- "init": Initialize all existing shapes for new users.
- "create": Create a new shape in the 3D scene
- "move": Move a shape to a new position.
- "delete": Remove a shape from the scene.
---
# Example Workflow
1.Creating a Shape:
  -A user clicks "Create Box" and a new box is created. This triggers a WebSocket message that adds the shape to the scene for all users.
2.Moving a Shape:
 - When a shape is moved, the new position is broadcast to all clients via WebSocket.
3.Deleting a Shape:
 - A shape can be removed by emitting a delete message to the server, and it will disappear for everyone.
---
# Error Handling and Troubleshooting
 1.WebSocket Connection Errors:
  - Ensure the backend server is running on http://localhost:3004.

 2.Room Not Found Error:
  -  Make sure the game room is correctly configured in the server/index.js file.
    
3.CORS Issues:
 - Add appropriate CORS headers in the server if encountering cross-origin errors.
---
# Deployment Instructions
1.Frontend Deployment
 - You can deploy the frontend on platforms like Netlify, Vercel, or GitHub Pages.
2. Backend Deployment
 - Deploy the backend using Heroku or AWS Lambda with API Gateway for serverless architecture.
---
# Contributing
 Feel free to submit issues or pull requests to enhance the project.
 
 ---
# License
This project is licensed under the MIT License.
---
# Acknowledgments
- Babylon.js Documentation
- Colyseus Documentation
- React Documentation
---

```bash

---

This version contains everything needed for your **README.md**, covering the project structure, setup, usage, and troubleshooting. You can replace `<your-repository-url>` with the actual GitHub URL when ready. Let me know if any modifications are required!



```







