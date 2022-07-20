const query = require('./src/query')
const get = require('./src/get')
const write = require('./src/write')
const check = require('./src/check')
const config = require('./config/config.json')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const init = () => {
  rl.question("Enter the streamer's ID you want to download. : ", async (streamerID) => {
    try {
      const emotes = await query.userSubscriptionProducts(streamerID)
      check.directory(config, streamerID)
      for (emoteElement of emotes) {
        console.log(`Downloading ${emoteElement.text}`)
        const res = await get.emote(emoteElement.id)
        await write.emote(config, streamerID, res[0], emoteElement.id, emoteElement.text, res[1])
      }
    } catch (error) {
      console.log(error)
    }
    rl.close()
  })
}

init()