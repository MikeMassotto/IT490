import asyncio
import json
import math
import pika

import config
import util
import steam_api

async def main():

    connection = pika.BlockingConnection(pika.ConnectionParameters(config.BROKER_HOST, config.BROKER_PORT, config.VHOST, pika.PlainCredentials(config.USER, config.PASSWORD)))
    channel = connection.channel()

    appids = steam_api.request_current_top_100()
    apps = {}

    #await steam_api.request_app_details_multi(appids)
    appid_chunks = list(util.divide_chunks(appids, math.ceil(len(appids) / 30)))
    print(appids)
    for id in appids:
        apps[id] = steam_api.request_app_details( id )
        channel.basic_publish(exchange=config.EXCHANGE, routing_key=config.QUEUE, body=json.dumps(apps[id]))
        break
    #apps = await steam_api.request_app_details_multi( appids )

    with open('result.json', 'w') as fp:
        json.dump(apps, fp)

    connection.close()

asyncio.run(main())