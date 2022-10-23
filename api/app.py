import steam_api
import json

appids = steam_api.request_current_top_100()
count = 0
apps = {}
for appid in appids:
    print( count, "/", len(appids))
    details = steam_api.request_app_details( appid )

    if "type" in details:
        apps[str(appid)] = details
    count = count + 1
print(len(apps))
with open('result.json', 'w') as fp:
    json.dump(apps, fp)

