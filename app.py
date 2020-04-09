import os
import requests
import json
import urllib.request
with open('config.json') as json_file:
    json_data = json.load(json_file)
    path = json_data["path"]
    client_id = json_data["client_id"]

if __name__ == "__main__":
    streamer = input("다운로드를 원하는 스트리머의 ID를 입력해주세요. : ")
    id = requests.get("https://api.twitch.tv/helix/users?login="+streamer, headers={'Client-ID': f'{client_id}'}).json()['data'][0]['id']
    if not(os.path.isdir(f"{path}{streamer}")):
            os.makedirs(os.path.join(f"{path}{streamer}"))
    emote_list = requests.get('https://api.twitchemotes.com/api/v4/channels/'+id).json()['emotes']
    num = 0
    while True:
        print (f"{num+1}/{len(emote_list)}Downloading {emote_list[num]['code']}")
        urllib.request.urlretrieve(f"https://static-cdn.jtvnw.net/emoticons/v1/{emote_list[num]['id']}/3.0", f"{path}{streamer}/{emote_list[num]['code']}.png")
        num += 1
        if num == len(emote_list):
            break
