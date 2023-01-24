const guildConfigDatabase = require('../schemas/botconfig-schema')

// Function to load all the guild configs from the database into the client object
async function loadGuildConfigs(client) {
    ;(await guildConfigDatabase.find()).forEach((guildConfigElement) => {
        client.guildConfigs.set(guildConfigElement.guildID, guildConfigElement)
    })

    return console.log('Guild Configs loaded to the client Collection.')
}

module.exports = { loadGuildConfigs }
