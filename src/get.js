const fetch = require('node-fetch')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const emote = (emoteID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res
      let extension
      if (emoteID.includes('emotesv2')) {
        extension = 'gif'
        res = await fetch(`https://static-cdn.jtvnw.net/emoticons/v2/${emoteID}/animated/light/3.0`, {
          method: "GET"
        })
        if (res.status === 404) {
          extension = 'png'
          res = await fetch(`https://static-cdn.jtvnw.net/emoticons/v2/${emoteID}/static/light/3.0`, {
            method: "GET"
          })
        }
      } else {
        extension = 'png'
        res = await fetch(`https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/3.0`, {
          method: "GET"
        })
      }
      resolve([res, extension])
    } catch (error) {
      reject(error)
    }
  })
}

const answer = (question) => {
  return new Promise((resolve,reject) => {
    rl.question(question, async (result) => {
      rl.close()
      resolve(result)
    })
  })
}

exports.emote = emote
exports.answer = answer