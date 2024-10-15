import React, { useEffect, useRef, useState } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from '@babylonjs/core';
import { Client } from 'colyseus.js';
import './App.css';

const App = () => {
  const [shapes, setShapes] = useState({});
  const [isRoomReady, setIsRoomReady] = useState(false); // State to track if the room is ready
  const canvasRef = useRef();
  const roomRef = useRef();

  useEffect(() => {
    // Create a new Colyseus client
    const client = new Client('ws://localhost:3004'); // Ensure the correct WebSocket URL

    // Join the game room
    client.joinOrCreate('game').then((room) => {
      roomRef.current = room;
      setIsRoomReady(true); // Set room ready to true

      // Set up message handlers
      room.onMessage('init', (objects) => setShapes(objects));
      room.onMessage('create', (object) => setShapes((prev) => ({ ...prev, [object.id]: object })));
      room.onMessage('move', ({ id, position }) =>
        setShapes((prev) => ({
          ...prev,
          [id]: { ...prev[id], position },
        }))
      );
      room.onMessage('delete', ({ id }) => {
        setShapes((prev) => {
          const newShapes = { ...prev };
          delete newShapes[id];
          return newShapes;
        });
      });
    }).catch((error) => {
      console.error("Error joining room:", error);
      alert("Could not connect to the server. Please check if the server is running.");
    });

    // Initialize Babylon.js engine and scene
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
    camera.attachControl(canvasRef.current, true);

    new HemisphericLight('light', new Vector3(1, 1, 0), scene);

    engine.runRenderLoop(() => scene.render());

    return () => {
      engine.dispose();
    };
  }, []);

  const createShape = (shapeType) => {
    const room = roomRef.current;
    if (!room) {
      console.error("Room is not defined, unable to send create message.");
      return;
    }

    // Create the mesh and then send the message
    const mesh = MeshBuilder[shapeType]('shape', { size: 1 });
    const position = { x: 0, y: 0, z: 0 }; // Default position
    room.send('create', { id: mesh.id, type: shapeType, position });

    // Render the mesh in the Babylon.js scene
    mesh.position = new Vector3(position.x, position.y, position.z);
  };

  const moveShape = (id, direction) => {
    const room = roomRef.current;
    if (!room) {
      console.error("Room is not defined, unable to send move message.");
      return;
    }

    const shape = shapes[id];
    if (shape && shape.position) {
      const newPos = {
        x: shape.position.x + direction.x,
        y: shape.position.y + direction.y,
        z: shape.position.z + direction.z,
      };
      room.send('move', { id, position: newPos });
    } else {
      console.error(`Shape with id ${id} not found or has no position.`);
    }
  };

  return (
    <div className="App">
      <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }} />
      <div className="controls">
        <button onClick={() => createShape('CreateBox')} disabled={!isRoomReady}>Create Box</button>
        <button onClick={() => createShape('CreateSphere')} disabled={!isRoomReady}>Create Sphere</button>
      </div>
    </div>
  );
};

export default App;
