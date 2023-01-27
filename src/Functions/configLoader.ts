import DiscordBot from '../Client/discordBot'
import guildConfigDatabase from '../schemas/botconfig-schema'

const loadGuildConfigsFn = async function loadGuildConfigs(client: DiscordBot) {
    ;(await guildConfigDatabase.find()).forEach((guildConfigElement) => {
        client.guildConfigs.set(guildConfigElement.guildID, guildConfigElement)
    })

    return console.log('Guild Configs loaded to the client Collection.')
}

export default loadGuildConfigsFn
