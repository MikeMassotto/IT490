import amqp from "amqplib";
import {
  v4 as uuidv4
} from "uuid";
import config from "./config.json"assert { type : 'json' };
export async function send(queue, data) {
  // amqp connection
  const conn = await amqp.connect(config);

  const channel = await conn.createChannel();

  // create a queue for the request-response pattern
  await channel.assertQueue("response_" + queue, {
    durable: true
  });

  //channel.consume(queue, async (msg) => {
  //  // get the request data
  //  const request = JSON.parse(msg.content.toString());
//
  //  console.log("Server received:", request);
  //  // process the request and generate a response
  //  const response = {
  //    data: "pong",
  //  };
//
  //  // send the response back to the client
  //  await channel.sendToQueue(
  //    msg.properties.replyTo,
  //    Buffer.from(JSON.stringify(response)), {
  //      correlationId: msg.properties.correlationId,
  //    }
  //  );
//
  //  // acknowledge the request message
  //  channel.ack(msg);
  //});

  const requestId = uuidv4();
  console.log("Request ID:", requestId);
  const request = data;

  console.log(request)

  // send the request message to the queue
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(request)), {
    // specify a reply-to queue for the response
    replyTo: "response_" + queue,

    // set the correlation ID to the request ID
    correlationId: requestId,
    routingKey: "*"
  });

  return new Promise((resolve, reject) => {
    // added a promise to return the response
    channel.consume("response_" + queue, (msg) => {
      console.log(msg.properties.correlationId + " | " + requestId);
      if (msg.properties.correlationId === requestId) {
        // get the response data
        const response = JSON.parse(msg.content.toString('utf-8'));
        // acknowledge the response message
        channel.ack(msg);

        // resolve the promise with the response data
        resolve(response);
      }
    });
  });
}

export const types = {
  user: {
    new_user: "new_user",
    login: "login",
    get_friends: "get_friends",
    get_user_data: "get_user_data",
    get_username_from_id: "get_username_from_id",
    get_account_id: "get_account_id",
    add_friend: "add_friend",
    add_acheivement: "add_acheivement",
    get_acheivements: "get_acheivements",
    user_update_achievements_public: "user_update_achievements_public",
    user_update_friends_public: "user_update_friends_public",
    user_update_profile_public: "user_update_profile_public"
  },
  game: {
    new_steam_game: "new_steam_game",
    get_steam_game: "get_steam_game",
    get_all_steam_games: "get_all_steam_games",
  },
  lobby: {
    lobby_add: "lobby_add",
    lobby_remove: "lobby_remove",
    lobby_update_status: "lobby_update_status",
    get_lobbies: "get_lobbies",
    update_stats: "update_stats"
  }
}
