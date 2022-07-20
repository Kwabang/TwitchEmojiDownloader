const fetch = require('node-fetch')

const userSubscriptionProducts = (streamerID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResponse = await fetch(`https://gql.twitch.tv/gql`, {
        method: "POST",
        headers: {
          'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        },
        body: JSON.stringify({
          query: `query {	
            user(login: "${streamerID}") {
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
      queryResponse = await queryResponse.json()
      if (queryResponse.data.user === null) {
        reject('The requested streamer\'s information does not exist.')
      } else {
        const emoteArray = queryResponse.data.user.subscriptionProducts
        if(!emoteArray.length) reject('The requested streamer\'s emotes does not exist.')
        let emotes = []
        for (emoteElement of emoteArray) {
          emotes = emotes.concat(emoteElement.emotes)
        }
        resolve(emotes)
      }
    } catch (error) {
      reject(error)
    }
  })
}

exports.userSubscriptionProducts = userSubscriptionProducts