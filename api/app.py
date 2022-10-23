import asyncio
import steam_api
import json

async def main():

    appids = steam_api.request_current_top_100()
    count = 0
    apps = {}

    #await steam_api.request_app_details_multi(appids)
    apps = await steam_api.request_app_details_multi( appids )

    with open('result.json', 'w') as fp:
        json.dump(apps, fp)

asyncio.run(main())