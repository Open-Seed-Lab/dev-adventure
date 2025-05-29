import { Server } from 'socket.io';
import http from 'http'
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:5173']
	}
});

// const userSocketMap = new Map<string, string>();
// function setOnlineUserMap(key: string, value: string) {
// 	userSocketMap.set(key, value);
// }
// function getOnlineUserIds() {
// 	return Array.from(userSocketMap.keys());
// }
// function removeUserFromSocketMap(key: string) {
// 	userSocketMap.delete(key)
// }

const userSocketMap: { [key: string]: string } = {}
function setOnlineUserMap(key: string, value: string) {
	userSocketMap[key] = value
}
function getOnlineUserIds(): string[] {
	console.log("userSocketMap")
	console.log(userSocketMap)
	return Object.keys(userSocketMap);
}
function removeUserFromSocketMap(key: string) {
	delete userSocketMap[key]
}
export function getUserSocketId(userId: string) {
	return userSocketMap[userId]
}

io.on('connection', (socket) => {

	console.log(`[mern-chat-app] [socket.io] - Connected user: ${socket.id}`)

	const { userId } = socket.handshake.query
	if (userId) {
		setOnlineUserMap(`${userId}`, `${socket.id}`);
	}

	emitOnlineUsers('on Connection');

	socket.on('disconnect', () => {

		console.log(`[mern-chat-app] [socket.io] disconnected user: ${socket.id}`)

		const { userId: disconnectedUserId } = socket.handshake.query
		if (disconnectedUserId) {
			removeUserFromSocketMap(`${disconnectedUserId}`)
		}

		emitOnlineUsers('on disconnection');
	});
});

function emitOnlineUsers(reason: string) {
	const onlineUsers = getOnlineUserIds()
	console.log(`[mern-chat-app] [socket.io] online users ${reason}: ${onlineUsers}`)
	io.emit('getOnlineUsers', onlineUsers);
}

export { io, app, server }
