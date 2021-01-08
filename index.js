const fs = require('fs')
const fetch = require('node-fetch')
const readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const init = async () => {
	rl.question("다운로드를 원하는 스트리머의 ID를 입력해주세요. : ", (streamer) => {
		download(streamer)
		rl.close()
	})
}

const download = async (streamer) => {
	let token
	let user_data
	let emote_list
	let fileStream
	let config = JSON.parse(fs.readFileSync('./config/config.json'))
	try {
		res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${config.client_id}&client_secret=${config.token}&grant_type=client_credentials`, {
			method: "POST"
		})
		token = (await res.json()).access_token
	} catch (error) {
		console.log(`Token 생성 요청에 실패하였습니다.\n${error}`)
		return
	}
	try {
		res = await fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, {
			method: "GET",
			headers: {
				'Client-ID': config.client_id,
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})
		user_data = await res.json()
		if (user_data.data[0] === undefined) {
			console.log(`존재하지 않는 유저입니다.`)
			return
		}
	} catch (error) {
		console.log(`유저 정보 요청에 실패하였습니다.\n${error}`)
		return
	}
	try {
		res = await fetch(`https://api.twitchemotes.com/api/v4/channels/${user_data.data[0]['id']}`, {
			method: "GET"
		})
		if (res.status == 404) {
			console.log(`이모티콘이 존재하지않습니다.`)
			return
		}
		emote_list = (await res.json()).emotes
	} catch (error) {
		console.log(`이모티콘 리스트 요청에 실패하였습니다.\n${error}`)
		return
	}
	fs.stat(config.path, (err, stat) => {
		if (err != null) fs.mkdirSync(config.path)
	})
	fs.stat(config.path + streamer, (err, stat) => {
		if (err != null) fs.mkdirSync(config.path + streamer)
	})
	for (let i = 0; i <= emote_list.length; i++) {
		if (i == emote_list.length) {
			console.log(`이모티콘 다운로드가 완료되었습니다.`)
			await new Promise(resolve => {
				setTimeout(resolve, 1000)
			})
		} else {
			console.log(`Downloading ${emote_list[i].code}`)
			res = await fetch(`https://static-cdn.jtvnw.net/emoticons/v1/${emote_list[i].id}/3.0`, {
				method: "GET"
			})
			fileStream = fs.createWriteStream(config.path + streamer + '/' + emote_list[i].code + '.png')
			await new Promise((resolve, reject) => {
				res.body.pipe(fileStream)
				res.body.on("error", reject)
				fileStream.on("finish", resolve)
			}).catch((error) => {
				console.log(`이모티콘 다운로드에 실패하였습니다.\n${error}`)
			})
		}
	}
}

init()