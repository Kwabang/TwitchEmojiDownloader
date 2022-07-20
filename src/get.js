const fetch = require('node-fetch')

const emote = (emoteID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res
      if(emoteID.includes('emotesv2')) {
        res = await fetch(`https://static-cdn.jtvnw.net/emoticons/v2/${emoteID}/animated/light/3.0`, {
          method: "GET"
        })
      } else {
        res = await fetch(`https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/3.0`, {
          method: "GET"
        })
      }
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

exports.emote = emote