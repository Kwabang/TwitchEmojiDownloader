import requests
import json
import urllib.request

with open('config.json') as json_file:
    json_data = json.load(json_file)
    id = json_data["twitch_user_id"]

data = requests.get('https://api.twitchemotes.com/api/v4/channels/'+id).json()
total = len(data['emotes'])
num = 
emote_id = (data['emotes'][num]['id'])
emote_name = (data['emotes'][num]['code'])
url = f"https://static-cdn.jtvnw.net/emoticons/v1/{emote_id}/3.0"
path = "img/"
image_name = f"{emote_name}.png"

if __name__ == "__main__":
    urllib.request.urlretrieve(url, path+image_name)
