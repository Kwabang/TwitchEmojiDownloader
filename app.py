import requests
import json

with open('config.json') as json_file:
    json_data = json.load(json_file)
    id = json_data["twitch_user_id"]
data = requests.get('https://api.twitchemotes.com/api/v4/channels/'+id).json()

if __name__ == "__main__":
    print (data)
