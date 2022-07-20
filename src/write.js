const fs = require('fs')

const emote = (config, streamerID, res, emoteID, emoteText, extension) => {
  return new Promise(async (resolve, reject) => {
    let fileStream
    if (emoteID.includes('emotesv2')) {
      fileStream = fs.createWriteStream(config.path + streamerID + '/' + emoteText + '.' + extension)
    } else {
      fileStream = fs.createWriteStream(config.path + streamerID + '/' + emoteText + '.' + extension)
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