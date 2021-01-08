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
	let user_data
	let config = JSON.parse(fs.readFileSync('./config/config.json'))
	try {
		res = await fetch(`https://gql.twitch.tv/gql`, {
			method: "POST",
			headers: {
				'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
			},
			body: JSON.stringify({
				query: `query {	
					user(login: "${streamer}") {
						subscriptionProducts {
							emotes {
								id
								text
							}
						}
					}
				}`
			})
		})
		user_data = await res.json()
		if (user_data.data.user === null) {
			console.log(`존재하지 않는 유저입니다.`)
			return
		}
	} catch (error) {
		console.log(`유저 정보 요청에 실패하였습니다.\n${error}`)
		return
	}
	fs.stat(config.path, (err, stat) => {
		if (err != null) fs.mkdirSync(config.path)
	})
	fs.stat(config.path + streamer, (err, stat) => {
		if (err != null) fs.mkdirSync(config.path + streamer)
	})
	for (let i = 0; i < user_data.data.user.subscriptionProducts.length; i++) {
		let emote_list = user_data.data.user.subscriptionProducts[i].emotes
		for (let n = 0; n < emote_list.length; n++) {
			console.log(`Downloading ${emote_list[n].text}`)
			res = await fetch(`https://static-cdn.jtvnw.net/emoticons/v1/${emote_list[n].id}/3.0`, {
				method: "GET"
			})
			let fileStream = fs.createWriteStream(config.path + streamer + '/' + emote_list[n].text + '.png')
			await new Promise((resolve, reject) => {
				res.body.pipe(fileStream)
				res.body.on("error", reject)
				fileStream.on("finish", resolve)
			}).catch((error) => {
				console.log(`${emote_list[n].text} 이모티콘 다운로드에 실패하였습니다.\n${error}`)
			})
		}
	}
	console.log(`이모티콘 다운로드가 완료되었습니다.`)
	await new Promise(resolve => {
		setTimeout(resolve, 1000)
	})
}

init()