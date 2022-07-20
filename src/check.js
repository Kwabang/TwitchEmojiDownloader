const fs = require('fs')

const directory = (config, streamerID) => {
  fs.stat(config.path, (err, stat) => {
    if (err !== null) fs.mkdirSync(config.path)
  })
  fs.stat(config.path + streamerID, (err, stat) => {
    if (err !== null) fs.mkdirSync(config.path + streamerID)
  })
}

exports.directory = directory