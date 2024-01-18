// Listen to websocket server messages
export function getDataFromWebSocket(socket, callback){
    // Listen for messages
    socket.addEventListener('message', event => {
        const data = event.data;
        callback(data);
    });
}