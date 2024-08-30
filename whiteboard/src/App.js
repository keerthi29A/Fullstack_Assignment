import React, { useState } from 'react';
import Canvas from './components/Canvas';
import UserList from './components/UserList';
import WebSocketManager from './components/WebSocketManager';

const App = () => {
    const [users, setUsers] = useState([]);
    const [drawings, setDrawings] = useState([]);

    const handleDraw = (drawing) => {
        setDrawings([...drawings, drawing]);
    };

    const handleUserListUpdate = (users) => {
        setUsers(users);
    };

    const { sendDrawing } = WebSocketManager({
        onDraw: handleDraw,
        onUserListUpdate: handleUserListUpdate,
    });

    return (
        <div className="app">
            <Canvas sendDrawing={sendDrawing} />
            <UserList users={users} />
        </div>
    );
};

export default App;
