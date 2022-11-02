import asyncio
import json
import math
import pika

import config
import util
import steam_api

async def main():

    print("Opening connection to RabbitMQ...")
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(config.BROKER_HOST, config.BROKER_PORT, config.VHOST, pika.PlainCredentials(config.USER, config.PASSWORD)))
    except:
        print("Failed to connect to RabbitMQ. Check that the connection parameters are correct.")
        return
    channel = connection.channel()
    print("Declaring queue variables...")
    channel.queue_declare(queue=config.QUEUE, durable=True, arguments={"x-queue-type:": "quorum"})

    print("Grabbing Steam API data...")
    #appids = steam_api.request_current_top_100()
    appids = ["730", "10"]
    apps = {}

    #await steam_api.request_app_details_multi(appids)
    #appid_chunks = list(util.divide_chunks(appids, math.ceil(len(appids) / 30)))
    
    print("Grabbing app details...")
    for id in appids:
        print("Grabbing app details for " + str(id))
        apps[id] = steam_api.request_app_details( id )
        apps[id]["type"] = "login"
        print("Publishing app details...")
        channel.basic_publish(
            exchange=config.EXCHANGE, 
            routing_key=config.QUEUE, 
            body=json.dumps(apps[id]),
            
            properties=pika.BasicProperties( content_type="plain/text", reply_to="testQueue_response" ))
        print("Published app details for " + str(id))
    #apps = await steam_api.request_app_details_multi( appids )
    print("Closing connection...")
    with open('result.json', 'w') as fp:
        json.dump(apps, fp)

    connection.close()

asyncio.run(main())