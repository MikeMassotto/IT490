import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";
import config from "./config.json" assert { type: 'json' };
export async function send(queue, data) {
  // amqp connection
  const conn = await amqp.connect(config);

  const channel = await conn.createChannel();

  // create a queue for the request-response pattern
  await channel.assertQueue("response_" + queue, { durable: true });

  channel.consume(queue, async (msg) => {
    // get the request data
    const request = JSON.parse(msg.content.toString());

    console.log("Server received:", request);
    // process the request and generate a response
    const response = {
      data: "pong",
    };

    // send the response back to the client
    await channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(response)),
      {
        correlationId: msg.properties.correlationId,
      }
    );

    // acknowledge the request message
    channel.ack(msg);
  });

  const requestId = uuidv4();

  const request = {
    data: data,
  };

  // send the request message to the queue
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(request)), {
    // specify a reply-to queue for the response
    replyTo: "response_" + queue,

    // set the correlation ID to the request ID
    correlationId: requestId,
  });

  return new Promise((resolve, reject) => {
    // added a promise to return the response
    channel.consume("response_" + queue, (msg) => {
      if (msg.properties.correlationId === requestId) {
        // get the response data
        const response = JSON.parse(msg.content.toString());

        // acknowledge the response message
        channel.ack(msg);

        // resolve the promise with the response data
        resolve(response);
      }
    });
  });
}
