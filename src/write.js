const fs = require('fs')

const emote = (config, streamerID, res, emoteID, emoteText) => {
  return new Promise(async (resolve, reject) => {
    let fileStream
    if (emoteID.includes('emotesv2')) {
      fileStream = fs.createWriteStream(config.path + streamerID + '/' + emoteText + '.gif')
    } else {
      fileStream = fs.createWriteStream(config.path + streamerID + '/' + emoteText + '.png')
    }
    try {
      await new Promise((resolve, reject) => {
        res.body.pipe(fileStream)
        res.body.on("error", reject)
        fileStream.on("finish", resolve)
      })
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

exports.emote = emote