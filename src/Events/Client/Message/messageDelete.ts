import { Events, Message } from 'discord.js'
import DiscordBot from '../../../Client/discordBot'
import { Event } from '../../../types/Event'

const messageDelete: Event<Events.MessageDelete> = {
    name: Events.MessageDelete,
    listener: async (message: Message & { client: DiscordBot }) => {
        if (message.author.bot) return

        console.log('Mesage Deleted : ' + message.content)
    }
}

export default messageDelete
