import { Events, Message } from 'discord.js'
import DiscordBot from '../../../Client/discordBot'
import { Event } from '../../../types/Event'

const messageCreate: Event<Events.MessageCreate> = {
    name: Events.MessageCreate,
    listener: async (message: Message & { client: DiscordBot }) => {
        if (message.author.bot) return
        console.log(message.client)

        // Actions
        // console.log(message.content)
        message
            .reply('hahah!')
            .catch((err) =>
                console.log(
                    'There was an error replying. "' +
                        __filename +
                        ', ' +
                        ' | Error: ' +
                        err.message
                )
            )
        // check for bumps
        // BlackListed words system here
        // exp system here (if no blacklisted words)
        // check for doxbin stuff posted here
        // invite link detector here
        // DB changes
        try {
            await message.client.db.memberMessageIncrement(
                message.guild,
                message.author
            )
        } catch (err) {
            console.log('ERROR! : ' + err)
        }
        // Loggings
    }
}

export default messageCreate
