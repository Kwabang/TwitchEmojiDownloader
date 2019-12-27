import requests
import json
import urllib.request
with open('config.json') as json_file:
    json_data = json.load(json_file)
    id = json_data["twitch_user_id"]
    path = json_data["path"]

num = 0
path = "img/"

if __name__ == "__main__":
    while True:
        emote_id = (requests.get('https://api.twitchemotes.com/api/v4/channels/'+id).json()['emotes'][num]['id'])
        emote_name = (requests.get('https://api.twitchemotes.com/api/v4/channels/'+id).json()['emotes'][num]['code'])
        url = f"https://static-cdn.jtvnw.net/emoticons/v1/{emote_id}/3.0"
        image_name = f"{emote_name}.png"
        print (f"Downloading {emote_name}")
        urllib.request.urlretrieve(url, path+image_name)
        num += 1
        if num == len(requests.get('https://api.twitchemotes.com/api/v4/channels/'+id).json()['emotes']):
            break
