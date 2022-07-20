const fs = require('fs')

const emote = (config, streamerID, res, emoteText) => {
  return new Promise(async (resolve, reject) => {
    const fileStream = fs.createWriteStream(config.path + streamerID + '/' + emoteText + '.png')
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