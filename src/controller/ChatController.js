import { Client } from "@stomp/stompjs/esm6";
import { getUser } from "./AccountController";

const SOCKET = "ws://localhost:8080/chat-lobby";
const RECEIVE_CHAT_TOPIC = "/chat/lobby";
const RECEIVE_CHAT_USERS_TOPIC = "/chat/lobby/users";
const SEND_CHAT_TOPIC = "/app/message/lobby";

let client = [];

export function connect(updateMessages, updateUsers) {
	console.log("Chat connect")

	client.push(new Client({
		brokerURL: SOCKET,
		connectHeaders: {},
		debug: function (str) {
			console.log("Chat: " + str);
		},
		reconnectDelay: 5000,
		heartbeatIncoming: 4000,
		heartbeatOutgoing: 4000,
	}));

	client[0].onConnect = () => {
		client[0].subscribe(RECEIVE_CHAT_TOPIC, message => updateMessages(JSON.parse(message.body)), {user: getUser().id});
		client[0].subscribe(RECEIVE_CHAT_USERS_TOPIC, users => updateUsers(JSON.parse(users.body)));
	};

	client[0].onStompError = frame => {
		console.log('Broker reported error: ' + frame.headers['message']);
		console.log('Additional details: ' + frame.body);
	}

	client[0].activate();
}

export function sendMessage(message) {
	client[0].publish({
		destination: SEND_CHAT_TOPIC,
		body: JSON.stringify({userId: getUser().id, body: message})
	});
}