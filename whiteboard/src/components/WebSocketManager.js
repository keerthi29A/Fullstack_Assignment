import { useEffect, useState } from 'react';

const WebSocketManager = ({ onDraw, onUserListUpdate }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        setSocket(ws);

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.type === 'drawing') {
                onDraw(data.payload);
            } else if (data.type === 'users') {
                onUserListUpdate(data.payload);
            }
        };

        return () => {
            ws.close();
        };
    }, [onDraw, onUserListUpdate]);

    const sendDrawing = (drawing) => {
        if (socket) {
            socket.send(JSON.stringify({ type: 'drawing', payload: drawing }));
        }
    };

    return { sendDrawing };
};

export default WebSocketManager;
 
