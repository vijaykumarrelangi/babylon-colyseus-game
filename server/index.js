const { Server, Room } = require("colyseus");
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Schema, MapSchema, type } = require("@colyseus/schema");

const PORT = 3004;
const app = express();
app.use(cors());

// Define Position Schema
class Position extends Schema {
  constructor(x = 0, y = 0, z = 0) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
type("number")(Position.prototype, "x");
type("number")(Position.prototype, "y");
type("number")(Position.prototype, "z");

// Define Shape Schema
class Shape extends Schema {
  constructor(type = "cube", position = new Position()) {
    super();
    this.type = type;
    this.position = position;
  }
}
type("string")(Shape.prototype, "type");
type(Position)(Shape.prototype, "position"); // Use Position schema here

// Define GameState Schema to hold shapes
class GameState extends Schema {
  constructor() {
    super();
    this.objects = new MapSchema();
  }
}
type({ map: Shape })(GameState.prototype, "objects");

// Define Game Room
class GameRoom extends Room {
  onCreate() {
    console.log("GameRoom created");
    this.setState(new GameState()); // Initialize state

    // Handle shape creation
    this.onMessage("create", (client, data) => {
      const { type = "cube", x = 0, y = 0, z = 0 } = data; // Validate data input
      const shape = new Shape(type, new Position(x, y, z)); // Create shape
      this.state.objects.set(client.sessionId, shape);

      console.log(`Shape created: ${client.sessionId}`);
      this.broadcast("create", { id: client.sessionId, shape });
    });

    // Handle shape movement
    this.onMessage("move", (client, position) => {
      const shape = this.state.objects.get(client.sessionId);
      if (shape) {
        shape.position.x = position.x; // Update x position
        shape.position.y = position.y; // Update y position
        shape.position.z = position.z; // Update z position
        console.log(`Shape moved: ${client.sessionId} to ${JSON.stringify(position)}`);
        this.broadcast("move", { id: client.sessionId, position });
      } else {
        console.error(`Shape not found for client: ${client.sessionId}`);
      }
    });
  }

  onJoin(client) {
    console.log(`${client.sessionId} joined`);
    client.send("init", Array.from(this.state.objects.entries()));
  }

  onLeave(client) {
    console.log(`${client.sessionId} left`);
    if (this.state.objects.has(client.sessionId)) {
      this.state.objects.delete(client.sessionId);
      this.broadcast("delete", { id: client.sessionId });
    }
  }

  onDispose() {
    console.log("GameRoom disposed");
  }
}

// Initialize Colyseus server
const server = http.createServer(app);
const gameServer = new Server({ server });
gameServer.define("game", GameRoom); // Define game room

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
