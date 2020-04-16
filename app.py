import os
import asyncio
import aiohttp
import aiofiles
import json
with open('config.json') as json_file:
    json_data = json.load(json_file)
    path = json_data["path"]
    client_id = json_data["client_id"]

async def download(streamer):
    if not(os.path.isdir(f"{path}{streamer}")):
        os.makedirs(os.path.join(f"{path}{streamer}"))
    async with aiohttp.ClientSession() as session:
        async with session.get(f'https://api.twitch.tv/helix/users?login={streamer}',headers={'Client-ID': f'{client_id}'}) as twitch_id:
            data = (await twitch_id.json())['data'][0]
        async with session.get(f"https://api.twitchemotes.com/api/v4/channels/{data['id']}") as emote_list:
            emote_list = (await emote_list.json())['emotes']
        num = 0
        while True:
            try:
                async with session.get(f"https://static-cdn.jtvnw.net/emoticons/v1/{emote_list[num]['id']}/3.0") as image_req:
                    if image_req.status == 200:
                        image_file = await aiofiles.open(f"{path}{streamer}/{emote_list[num]['code']}.png", mode='wb')
                        print (f"Downloading {emote_list[num]['code']}")
                        await image_file.write(await image_req.read())
                        await image_file.close()
                        num+=1
            except IndexError:
                print("End!")
                break

if __name__ == "__main__":
        streamer = input("다운로드를 원하는 스트리머의 ID를 입력해주세요. : ")
        loop = asyncio.get_event_loop()
        loop.run_until_complete(download(streamer))
        loop.close()
